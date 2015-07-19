
import AppDispatcher from '../dispatcher/AppDispatcher';
import Backbone from 'backbone';
import request from 'superagent';
import moment from 'moment';

import Members from '../stores/Members';

var Group = Backbone.Model.extend({

  urlRoot: '/api/groups',

  initialize: function(){
    this.dispatchokTen = AppDispatcher.register(this.dispatchCallback.bind(this));

    this
      .on('sync', (model, resp, options) => {
        if (options.silent){
          return;
        }

        this.trigger('end:' + options.event);
      })
      .on('error', (model, resp, options) => {
        this.trigger('error:' + options.event, resp);
      });
  },

  parse: function(request){

    request.members = new Members(request.members, { groupId: request.id });

    var pic = request.picture;
    request.picture = (pic ? '/images/groups/' + pic : '');

    return request;
  },

  dispatchCallback: function(payload){
    if (this.get('id') !== payload.group.id){
      return;
    }

    switch (payload.type) {
      case 'change-group':
        this.set(payload.group);
        break;
      case 'update-group':
        this.update(payload.group);
        break;
    }
  },

  count: function(type){
    return this.get(type) && this.get(type).length || 0;
  },

  update: function(model){

    this.save({
      title: model.title,
      description: model.description
    }, {
      patch: true,
      silent: true,
      success: group => {

        if (model.newpicture){
          request
            .post('/api/groups/' + model.id + '/picture')
            .attach('image', model.newpicture)
            .end( (err, res) => {
              if (err) {
                this.trigger('error:save', { error: err });
                return;
              }

              group.picture = res.picture;
              this.trigger('end:save', group);
            });

          return;
        }

        this.trigger('end:save', group);
      },
      error: (model, resp, options) => {
        this.trigger('error:save', { error: resp });
      }
    });

  }

});

Group.instance = new Group();
export default Group;