//import $ from 'jquery';
//window.$ = window.jQuery = $;

//import 'materialize-js'; > Enable this when it gets supported

import 'babel-core/polyfill';


import Backbone from 'backbone';

// Override Backbone.sync to use the PUT HTTP method for PATCH requests
//  when doing Model#save({...}, { patch: true });
// Add events for Backbone.sync on each method like: 'request:'

var originalSync = Backbone.sync;

var events = {
  'create': 'create',
  'update': 'save',
  'patch':  'save',
  'delete': 'delete',
  'read':   'fetch'
};

Backbone.sync = function(method, model, options) {

  if (method === 'patch') {
    options.type = 'PUT';
  }

  options.event = events[method];
  model.trigger('start:' + options.event);

  return originalSync(method, model, options);
};