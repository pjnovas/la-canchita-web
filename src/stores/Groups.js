
import AppDispatcher from '../dispatcher/AppDispatcher';
import Backbone from 'backbone';

import Group from './Group';

var Groups = Backbone.Collection.extend({

  model: Group,
  url: '/api/groups',

  initialize: function(){
    this.dispatchToken = AppDispatcher.register(this.dispatchCallback.bind(this));
  },

  dispatchCallback: function(payload){
    switch (payload.type) {
      case 'recieve-groups':
        this.add(payload.groups);
        break;
      case 'create-group':
        this.create(payload.group);
        break;
    }
  }

});

Groups.instance = new Groups();
export default Groups;
