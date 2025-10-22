import torch
from torch import nn
from torch import optim
import numpy as np
import math
import time

from skopt.space import Space
from skopt.sampler import Sobol
from skopt.sampler import Lhs
from skopt.sampler import Halton
from skopt.sampler import Hammersly
from skopt.sampler import Grid

class TestNetwork(nn.Module):
    def __init__(self, layersShape, device=None):
        super().__init__()
        print(torch.__version__)
        
        # Set device - use provided device or auto-select
        if device is None:
            #self.device = torch.device("cpu") #faster for small networks
            self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        else:
            self.device = torch.device(device)
        self.to(self.device)
        self.layersShape = layersShape
        self.layers = [] #e.g. linear
        self.weightsPerLayer = [0] #eg. [0,3,9,3]
        self.setNetworkShape(shape=layersShape)
        self.activation = nn.Sigmoid()
        #self.activation = nn.ReLU()
        self.loss = nn.MSELoss(reduction='mean')
        for param in self.layers.parameters():
            param.requires_grad = True

    def forward(self,x):
        x = torch.as_tensor(x,device=self.device)
        for i in range(len(self.layers)):
            x = self.layers[i](x)
            if(i != len(self.layers)-1):
                x = self.activation(x)
        return x

    def setWeights(self,w):
        with torch.no_grad():
            for i in range(len(self.layers)):
                cutT = np.reshape(
                    w[self.weightsPerLayer[i]:self.weightsPerLayer[i+1]],
                    [self.layersShape[i+1], self.layersShape[i]]
                )
                t = torch.as_tensor(cutT)
                self.layers[i].weight = torch.nn.Parameter(t.float())
        self.layers.to(self.device)

    def setBias(self,b):
        with torch.no_grad():
            neuronCounter = 0
            for i in range(len(self.layers)):
                self.layers[i].bias = torch.nn.Parameter(
                    torch.as_tensor(b[neuronCounter:neuronCounter+self.layersShape[i+1]]).float()
                )
                neuronCounter = neuronCounter + self.layersShape[i+1]
        self.layers.to(self.device)

    def randomizeParameters(self):
        for l in self.layers:
            l.reset_parameters()

    def predict(self,w,x):
        self.setWeights(w)
        return self.forward(x)

    def setActivationFunction(self,name):
        if(name=="sigmoid"):
            self.activation = nn.Sigmoid()
        if(name=="relu"):
            self.activation = nn.ReLU()
        if(name=="tanh"):
            self.activation = nn.Tanh()
        if(name=="linear"):
            self.activation = nn.Identity()

    def setLossFunction(self,name):
        if(name=="mse"):
            self.loss = nn.MSELoss(reduction='mean')
        if(name=="l1"):
            self.loss = nn.L1Loss(reduction='mean')

    def setNetworkShape(self,shape=[1,3,1],bias=True):
        self.layers = nn.ModuleList()
        self.layersShape = shape
        for i in range(len(self.layersShape)-1):
            self.layers.append(nn.Linear(shape[i],shape[i+1],bias=bias))
            self.weightsPerLayer.append(self.weightsPerLayer[-1]+shape[i]*shape[i+1])

    def getWeights(self):
        l = []
        for i in range(len(self.layers)):
            l.extend([e for sublist in self.layers[i].weight.tolist() for e in sublist])
        return l

    def getBiases(self):
        l = []
        for i in range(len(self.layers)):
            l.extend(self.layers[i].bias.tolist())
        return l


class NetworkSlicer():
    def __init__(self,network,trainingData,testData):
        self.network = network
        self.trainingData = trainingData
        self.testData = testData
        self.minX = -25.0
        self.maxX = 25.0

        # ---- CACHING ----
        self._cached_train = None  # (x, y) tensors on device
        self._cached_test = None   # (x, y) tensors on device

        # --- profiling state (coarse categories) ---
        self._prof = {
            'impl': 'Optimized',
            'mode': 'cached',   # this impl uses cached tensors
            'calls': 0,
            'data_prep_ns': 0,
            'loss_compute_ns': 0,
        }

    # public API to control/fetch profiling
    def reset_profile(self, label=None):
        self._prof.update({
            'calls': 0,
            'data_prep_ns': 0,
            'loss_compute_ns': 0,
            'label': label
        })
    def get_profile(self):
        return {
            'impl': self._prof.get('impl'),
            'mode': self._prof.get('mode'),
            'label': self._prof.get('label'),
            'calls': self._prof.get('calls'),
            'data_prep_ms': self._prof.get('data_prep_ns', 0) / 1e6,
            'loss_compute_ms': self._prof.get('loss_compute_ns', 0) / 1e6,
        }

    # ---- helpers for caching ----
    def _build_xy(self, data):
        """
        Convert list of dicts {'x': ..., 'y': ...} into tensors on the model's device.
        Ensures shapes [N, in_features] and [N, out_features].
        """
        x_list, y_list = [], []
        for d in data:
            xi = np.atleast_1d(d['x']).tolist()
            yi = np.atleast_1d(d['y']).tolist()
            x_list.append(xi)
            y_list.append(yi)
        x = torch.tensor(x_list, dtype=torch.float32, device=self.network.device)
        y = torch.tensor(y_list, dtype=torch.float32, device=self.network.device)
        return x, y

    def _ensure_cached(self):
        if self._cached_train is None and self.trainingData is not None:
            self._cached_train = self._build_xy(self.trainingData)
        if self._cached_test is None and self.testData is not None:
            self._cached_test = self._build_xy(self.testData)

    def computeLoss(self,w,b,useTrainingData=True):
        """
        Uses cached dataset tensors (built on first use).
        """
        # ---- DATA PREP (param set + cache ensure + tensor selection) ----
        dp_t0 = time.perf_counter_ns()

        self._ensure_cached()

        # select cached tensors
        if useTrainingData:
            if self._cached_train is None:
                raise ValueError("No training data provided")
            x, y = self._cached_train
        else:
            if self._cached_test is None:
                raise ValueError("No test data provided")
            x, y = self._cached_test

        self.network.setWeights(w)
        self.network.setBias(b)

        dp_t1 = time.perf_counter_ns()

        # ---- LOSS COMPUTE (forward + loss) ----
        self.network.eval()
        with torch.inference_mode():
            lc_t0 = time.perf_counter_ns()
            y_pred = self.network(x)
            loss = self.network.loss(y_pred,y)
            out = float(loss.item())
            lc_t1 = time.perf_counter_ns()

        # accumulate
        self._prof['calls'] += 1
        self._prof['data_prep_ns'] += (dp_t1 - dp_t0)
        self._prof['loss_compute_ns'] += (lc_t1 - lc_t0)
        return out

    def predict(self,w,b,x):
        self.network.setWeights(w)
        self.network.setBias(b)
        self.network.eval()
        with torch.inference_mode():
            xt = torch.as_tensor(x, dtype=torch.float32, device=self.network.device)
            return self.network(xt)

    def addFocusPoint(self, w, b, sampleSize=101, useTrainingData=True):
        # unchanged logic; computeLoss now benefits from caching + profiling
        w = np.asarray(w, dtype=float)
        b = np.asarray(b, dtype=float)
        fp = np.concatenate([w, b])
        len_w = len(w)

        center_loss = self.computeLoss(fp[:len_w], fp[len_w:], useTrainingData=useTrainingData)
        fpOrigin = {'origin': fp.copy(), 'loss': center_loss}

        dim = fp.size
        slices = []
        for d in range(dim):
            original = fp[d]
            samples = []
            step = (self.maxX - self.minX) / (sampleSize - 1) if sampleSize > 1 else 0.0
            for i in range(sampleSize):
                val = self.minX + i * step
                fp[d] = val
                loss = self.computeLoss(fp[:len_w], fp[len_w:], useTrainingData=useTrainingData)
                samples.append([val, loss])
            fp[d] = original
            slices.append(samples)

        return {'fpOrigin': fpOrigin, 'slices': slices}
    
    
    def predictOutput(self, w, b, xrange, yrange, samplesPerDim):
        predictions = []
        x = [0,0]
        for i in range(samplesPerDim):
            alpha = i/(samplesPerDim-1)
            x[0] = xrange[0] + alpha * (xrange[1]-xrange[0])
            for j in range(samplesPerDim):
                beta = j/(samplesPerDim-1)
                x[1] = yrange[0] + beta * (yrange[1]-yrange[0])
                predictions.append({'x':x[0],'y':x[1], 'value':self.predict(w, b, x).item()})
        return predictions

    def getOptimizedFocusPoint(self,epochs,lossThreshold,maxSeconds,bs,optimizerType,initialWeights,initialBiases,learningRate,weightDecay):
        # unchanged
        self.network.to(self.network.device)#
        if("adam" in optimizerType.lower()):
            optimizer = optim.Adam(self.network.layers.parameters(),weight_decay=weightDecay)
        if("sgd" in optimizerType.lower()):
            optimizer = optim.SGD(self.network.layers.parameters(),lr=learningRate,weight_decay=weightDecay)
        loss_fn = self.network.loss
        full_x = torch.tensor([[i['x']] for i in self.trainingData]).to(torch.float32).to(self.network.device) #training input
        full_y = torch.tensor([[[i['y']]] for i in self.trainingData]).to(torch.float32).to(self.network.device) #gt labels
        startTime = time.time()

        trajectory = []

        if (bs==0):
            bs = len(full_x)
        x = torch.split(full_x,bs)
        y = torch.split(full_y,bs)
        iterations = int(epochs*len(full_x)/bs)
        for e in range(iterations):
            y_pred = self.network(x[e%len(x)])
            loss = loss_fn(y_pred,y[e%len(y)]) #batch loss
            total_loss = loss_fn(self.network(full_x),full_y).item() #total loss

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            if((time.time()-startTime)>maxSeconds):
                print("timeout")
                break
            if(total_loss < lossThreshold):
                print("loss reached",total_loss)
                break

        trajectory.append({'weights':self.network.getWeights(), 'biases':self.network.getBiases(), 'loss': total_loss})
        return trajectory

    def getRandomPoints(self,centerFP,quantity,samplingMethod,radius):
        # unchanged
        w = centerFP['weights']
        b = centerFP['biases']
        wb = w+b
        dim = len(wb)
        n_samples = quantity

        if(radius==0.0):
            return [{'weights':w,'biases':b,'loss':self.computeLoss(w,b)}]
        
        space = Space([(float(wb[i]-radius),float(wb[i]+radius)) for i in range(dim)])
        x = space.rvs(n_samples)

        if(samplingMethod=="lhs classic"):
            lhs = Lhs(lhs_type="classic", criterion=None)
            x = lhs.generate(space.dimensions, n_samples)
        if(samplingMethod=="lhs centered"):
            lhs = Lhs(lhs_type="centered", criterion=None)
            x = lhs.generate(space.dimensions, n_samples)
        if(samplingMethod=="lhs maximin"):
            lhs = Lhs(criterion="maximin", iterations=10000)
            x = lhs.generate(space.dimensions, n_samples)
        if(samplingMethod=="lhs correlation"):
            lhs = Lhs(criterion="correlation", iterations=10000)
            x = lhs.generate(space.dimensions, n_samples)
        if(samplingMethod=="lhs ratio"):
            lhs = Lhs(criterion="ratio", iterations=10000)
            x = lhs.generate(space.dimensions, n_samples)
        if(samplingMethod=="halton"):
            halton = Halton()
            x = halton.generate(space.dimensions, n_samples)
        if(samplingMethod=="sobol"):
            sobol = Sobol()
            x = sobol.generate(space.dimensions, n_samples)
        if(samplingMethod=="hammersly"):
            hammersly = Hammersly()
            x = hammersly.generate(space.dimensions, n_samples)
        if(samplingMethod=="grid"):
            grid = Grid(border="include", use_full_layout=False)
            x = grid.generate(space.dimensions, n_samples)

        randomFPList = [{'weights':e[:len(w)],'biases':e[len(w):],'loss':self.computeLoss(e[:len(w)],e[len(w):])} for e in x]
        return randomFPList


def create_test_network(layer_sizes, activation="relu", device=None):
    """
    Create a TestNetwork instance with configuration matching create_mlp().
    """
    network = TestNetwork(layersShape=layer_sizes, device=device)
    network.setActivationFunction(activation)
    return network
