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
    def __init__(self,layersShape):
        super().__init__()
        print(torch.__version__)
        #self.device = torch.device("cpu") #faster for small networks
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
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
        #with torch.no_grad():
        for i in range(len(self.layers)):
            x = self.layers[i](x)
            if(i != len(self.layers)-1):
                x = self.activation(x)
                x = x #+ self.layers[i].bias
        #output = x #no function
        return x
    def setWeights(self,w):
        with torch.no_grad():
            for i in range(len(self.layers)):
                cutT = np.reshape(w[self.weightsPerLayer[i]:self.weightsPerLayer[i+1]],[self.layersShape[i+1],self.layersShape[i]])
                t = torch.as_tensor(cutT)
                self.layers[i].weight = torch.nn.Parameter(t.float())
        #print(self.state_dict())
        self.layers.to(self.device)
    def setBias(self,b):
        with torch.no_grad():
            neuronCounter = 0
            for i in range(len(self.layers)):
                self.layers[i].bias = torch.nn.Parameter(torch.as_tensor(b[neuronCounter:neuronCounter+self.layersShape[i+1]]).float())
                neuronCounter = neuronCounter + self.layersShape[i+1]
        self.layers.to(self.device)
    def randomizeParameters(self):
        for l in self.layers:
            l.reset_parameters()
    def predict(self,w,x):
        self.setWeights(w)
        #x = torch.as_tensor(x).to('cuda:0')
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
        #if(name=="kldiv"):
        #    self.loss = nn.KLDivLoss()
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
        #self.minVals = [-25.0 for i in range(100)] #TODO change later
        #self.maxVals = [25.0 for i in range(100)] #change later
        self.minX = -25.0
        self.maxX = 25.0
    def computeLoss(self,w,b,useTrainingData=True):
        self.network.setWeights(w)
        self.network.setBias(b)
        loss_fn = self.network.loss
        if(useTrainingData):
            x = torch.tensor([[i['x']] for i in self.trainingData]).to(torch.float32).to(self.network.device)
            y = torch.tensor([[[i['y']]] for i in self.trainingData]).to(torch.float32).to(self.network.device)
        else:
            x = torch.tensor([[i['x']] for i in self.testData]).to(torch.float32).to(self.network.device)
            y = torch.tensor([[[i['y']]] for i in self.testData]).to(torch.float32).to(self.network.device)
        y_pred = self.network(x)
        loss = loss_fn(y_pred,y)
        return loss.item()
    def predict(self,w,b,x):
        self.network.setWeights(w)
        self.network.setBias(b)
        return self.network(x)
    def addFocusPoint(self, w, b, sampleSize=101):
        slices = [] #sampling slices for all fp
        dim = len(w)+len(b) #total slicing dim
        fp = w+b #total slicing vector (all parameters)
        fpOrigin = {'origin':fp,'loss':self.computeLoss(np.array(w),np.array(b))}

        for d in range(dim):
            samples = []
            vec = np.copy(np.array(fp,dtype=float))
            for i in range(sampleSize):
                alpha = i/(sampleSize-1)
                vec[d] = (self.minX + alpha*(self.maxX-self.minX))
                #print("weight:",vec[:len(w)],"bias:",vec[len(b):])
                loss = self.computeLoss(vec[:len(w)],vec[len(w):])
                samples.append([vec[d],loss])
            slices.append(samples)
        return {'fpOrigin':fpOrigin,'slices':slices}
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
        #if(initialWeights == None or initialBiases == None):
        #    self.network.randomizeParameters()
        #else:
        #    self.network.setWeights(initialWeights)
        #    self.network.setBias(initialBiases)
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

        #split in batches
        if (bs==0):
            bs = len(full_x)
        x = torch.split(full_x,bs)
        y = torch.split(full_y,bs)
        iterations = int(epochs*len(full_x)/bs)
        for e in range(iterations):
            #Compute labels and loss value
            y_pred = self.network(x[e%len(x)])
            loss = loss_fn(y_pred,y[e%len(y)]) #batch loss
            total_loss = loss_fn(self.network(full_x),full_y).item() #total loss

            #Optimize
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            #Stop condition: Time
            if((time.time()-startTime)>maxSeconds):
                print("timeout")
                break
            #Stop condition: Loss
            if(total_loss < lossThreshold):
                print("loss reached",total_loss)
                break
        #print("runtime:",(time.time()-startTime))

        trajectory.append({'weights':self.network.getWeights(), 'biases':self.network.getBiases(), 'loss': total_loss})
        return trajectory

    def getRandomPoints(self,centerFP,quantity,samplingMethod,radius):
        w = centerFP['weights']
        b = centerFP['biases']
        wb = w+b
        dim = len(wb)
        n_samples = quantity

        if(radius==0.0):
            return [{'weights':w,'biases':b,'loss':self.computeLoss(w,b)}]
        
        #Define search space
        space = Space([(float(wb[i]-radius),float(wb[i]+radius)) for i in range(dim)])
        x = space.rvs(n_samples)

        #Select method
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