# Copyright 2019 The TensorFlow Authors. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ==============================================================================
"""A sample plugin to demonstrate dynamic loading."""


import json
import mimetypes
import os

from tensorboard import plugin_util
from tensorboard.data import provider
from tensorboard.plugins import base_plugin
import werkzeug
from werkzeug import wrappers
from typing import Any, Optional

from tensorboard_loss_slicer import metadata

# Route definitions
BASE_ROUTE = '/'
INDEX_JS_ROUTE = '/index.js'
INDEX_HTML_ROUTE = '/index.html'
APP_JS_ROUTE = '/app.js'
BUNDLE_JS_ROUTE = '/bundle.js'
STYLES_CSS_ROUTE = '/tb-pluging-loss-slice.css'


class LossSlicerPlugin(base_plugin.TBPlugin):
    plugin_name = metadata.PLUGIN_NAME

    def __init__(self, context):
        """Instantiates LossSlicerPlugin.

        Args:
        context: A base_plugin.TBContext instance.
        """
        # Store context and data provider
        self._context = context
        self.data_provider = context.data_provider

    def is_active(self):
        """Return whether plugin should be active."""
        # Always show plugin tab; data will be fetched dynamically
        return True

    #define backend routes
    def get_plugin_apps(self):
        """Returns a mapping between routes and handlers."""
        return {
            BASE_ROUTE: self.default_handler,
            "/tags": self.tags_handler,
            "/slices": self.slices_handler,
            "/lib/plotly.min.js": self._serve_plotly_js,
            INDEX_JS_ROUTE: self.static_file_route,
            INDEX_HTML_ROUTE: self.static_file_route,
            BUNDLE_JS_ROUTE: self.static_file_route,
            STYLES_CSS_ROUTE: self.static_file_route,
            APP_JS_ROUTE: self.static_file_route,
        }
        
    def frontend_metadata(self):
        """Return metadata to be sent to the frontend.
        
        This is how the plugin tells TensorBoard where to find the ES module.
        """
        return base_plugin.FrontendMetadata(
            es_module_path=INDEX_JS_ROUTE,
            tab_name="Loss Slicer",
        )
    
  # pytype: disable=wrong-arg-types
    # Default handler for the base route
    @wrappers.Request.application
    def default_handler(self, _: wrappers.Request) -> wrappers.Response:
        contents = self._read_static_file_impl('index.html')
        return respond(contents, 'text/html')
        
    @wrappers.Request.application
    def static_file_route(self, request: wrappers.Request) -> wrappers.Response:
        # pytype: enable=wrong-arg-types
        filename = os.path.basename(request.path)
        extention = os.path.splitext(filename)[1]
        if extention == '.html':
          mimetype = 'text/html'
        elif extention == '.css':
          mimetype = 'text/css'
        elif extention == '.js':
          mimetype = 'application/javascript'
        else:
          mimetype = 'application/octet-stream'
        try:
          contents = self._read_static_file_impl(filename)
        except IOError:
          return respond('Fail to read the files.', 'text/plain', code=404)
        return respond(contents, mimetype)
        
    # Method for reading static file contents
    def _read_static_file_impl(self, filename: str) -> bytes:
        filepath = os.path.join(os.path.dirname(__file__), 'static', filename)
        try:
            with open(filepath, 'rb') as infile:
                contents = infile.read()
        except IOError as io_error:
            raise io_error
        return contents

    @wrappers.Request.application
    def _serve_plotly_js(self, request):
        del request  # unused
        filepath = os.path.join(os.path.dirname(__file__), "static", "lib", "plotly.min.js")
        with open(filepath, 'rb') as infile:
            contents = infile.read()
        return respond(contents, "text/javascript")

    @wrappers.Request.application
    def tags_handler(self, request):
        """Handles request for tags with slice data."""
        # List all runs and their tags for this plugin
        ctx = plugin_util.context(request.environ)
        experiment_id = plugin_util.experiment_id(request.environ)
        run_tag_mapping = self.data_provider.list_tensors(
            ctx=ctx, experiment_id=experiment_id, 
            plugin_name=metadata.PLUGIN_NAME, run_tag_filter=provider.RunTagFilter()
        )
        response = {}
        for run, tag_mapping in run_tag_mapping.items():
            response[run] = list(tag_mapping.keys())
        return respond(response, "application/json")
    
    @wrappers.Request.application
    def slices_handler(self, request):
        """Serves slice data for a specific run and tag."""
        print("slice handler called")
        run = request.args.get("run")
        tag = request.args.get("tag")
        ctx = plugin_util.context(request.environ)
        experiment_id = plugin_util.experiment_id(request.environ)
         
        if not (run and tag):
            return respond(
                "Both 'run' and 'tag' parameters are required.",
                "text/plain",
                code=400
            )
        
        run_tag_filter = provider.RunTagFilter(runs=[run], tags=[tag])
        tensor_events = self.data_provider.read_tensors(
            ctx=ctx,
            experiment_id=experiment_id,
            plugin_name=metadata.PLUGIN_NAME,
            downsample=100,  # Use a reasonable default value
            run_tag_filter=run_tag_filter
        )
        
        events = tensor_events.get(run, {}).get(tag, [])
        if not events:
            return respond(
                f"No slice data found for run '{run}' and tag '{tag}'.",
                "text/plain",
                code=404
            )
        
        # Process the events data correctly
        if len(events) > 0:
            # Get the most recent event (last in the list)
            latest_event = events[-1]
            
            # Extract tensor data, decode if binary, and parse as JSON
            try:
                # Access the tensor data and decode it
                if hasattr(latest_event.numpy, 'decode'):
                    tensor_data = latest_event.numpy.decode('utf-8')
                elif hasattr(latest_event.numpy, 'item'):
                    tensor_data = latest_event.numpy.item().decode('utf-8')
                else:
                    tensor_data = str(latest_event.numpy)
                
                # Parse the decoded data as JSON
                tensor_content = json.loads(tensor_data)
            except (AttributeError, TypeError, json.JSONDecodeError) as e:
                # Improved error handling with more diagnostic information
                print(f"Error processing tensor data: {e}")
            
            return respond(
                tensor_content,
                "application/json"
            )
        
        # If we get here, we had an empty events list but didn't catch it earlier
        return respond(
            {"error": "No valid event data found"},
            "application/json"
        )

# Helper function to create HTTP responses
def respond(body: Any, content_type: str, code: int = 200, 
           content_encoding: Optional[tuple[str, str]] = None) -> wrappers.Response:
    if content_type == 'application/json' and isinstance(
        body, (dict, list, set, tuple)):
        body = json.dumps(body, sort_keys=True)
    if not isinstance(body, bytes):
        body = body.encode('utf-8')
    
    response = wrappers.Response(body, content_type=content_type, status=code)
    
    # Set Content-Encoding header if specified
    if content_encoding is not None:
        encoding_name, encoding_value = content_encoding
        response.headers['Content-Encoding'] = encoding_name
    
    return response

