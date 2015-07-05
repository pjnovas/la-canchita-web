
import AppDispatcher from '../dispatcher/AppDispatcher';
import Backbone from 'backbone';

import Members from '../stores/Members';

var Group = Backbone.Model.extend({

  urlRoot: '/api/groups',

  initialize: function(){
    this.dispatchToken = AppDispatcher.register(this.dispatchCallback.bind(this));
  },

  parse: function(request){

    request.members = new Members(request.members, { groupId: request.id });

    return request;
  },

  dispatchCallback: function(payload){
    switch (payload.type) {
      case 'change-group':
        this.set(payload.group);
        break;
    }
  },

  imageURL: function(){
    return '/images/groups/' + this.get('id') + '.jpg';
  },

  count: function(type){
    return this.get(type) && this.get(type).length || 0;
  }

});

Group.instance = new Group();
export default Group;