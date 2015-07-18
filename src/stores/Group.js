
import AppDispatcher from '../dispatcher/AppDispatcher';
import Backbone from 'backbone';
import request from 'superagent';
import moment from 'moment';

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
    var pic = this.get('picture');
    return (pic ? '/images/groups/' + pic : '');
  },

  count: function(type){
    return this.get(type) && this.get(type).length || 0;
  },

  update: function(id, model, done){

    var g = new Group({ id: id });

    g.save(model, {
      patch: true,
      success: group => {

        if (model.picture){
          request
            .post('/api/groups/' + id + '/picture')
            .attach('image', model.picture)
            .end(err => {
              if (err) {
                console.dir(err); //return done(err);
              }

              done(null, group);
            });

          return;
        }

        done(null, group);
      },
      error: (model, resp, options) => {
        done(resp);
      }
    });

  }

});

Group.instance = new Group();
export default Group;