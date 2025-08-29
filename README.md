## PySlice Library

The PySlice library is a PyTorch-focused implementation that provides a comprehensive set of tools for loss landscape analysis.

#install requirements file

pip install -r requirements.txt

# Install in development mode
pip install -e .
```



# plugin 

for usage -> in plugin folder where you see setup.py run pip install -e .
npm is required for develpment 
for development npm install, in the frontend directory are the react ts files. if you want to look at the changes you need to build with npm run build. this build the files into the static folder. if you only do frontend changes then no need to reload the plugin. if you change backend logic (so plugin.py file) then the plugin needs to be reinstalled and tensorboard needs to be restarted.