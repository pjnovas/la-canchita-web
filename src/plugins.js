//import $ from 'jquery';
//window.$ = window.jQuery = $;

//import 'materialize-js'; > Enable this when it gets supported

import 'babel-core/polyfill';


import Backbone from 'backbone';

// Override Backbone.sync to use the PUT HTTP method for PATCH requests
//  when doing Model#save({...}, { patch: true });

var originalSync = Backbone.sync;

Backbone.sync = function(method, model, options) {

  if (method === 'patch') {
    options.type = 'PUT';
  }

  return originalSync(method, model, options);
};