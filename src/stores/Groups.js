
import AppDispatcher from '../dispatcher/AppDispatcher';
import Backbone from 'backbone';
import request from 'superagent';

import Group from './GroupModel';

var Groups = Backbone.Collection.extend({

  model: Group,
  url: '/api/groups',

  initialize: function(){
    this.dispatchToken = AppDispatcher.register(this.dispatchCallback.bind(this));

    this
      .on('sync', (model, resp, options) => {
        if (options.silent){
          return;
        }

        this.trigger('end:' + options.event, model);
      })
      .on('error', (model, resp, options) => {
        this.trigger('error:' + options.event, model, resp);
      });
  },

  dispatchCallback: function(payload){
    switch (payload.type) {
      case 'recieve-groups':
        this.add(payload.groups);
        break;
      case 'create-group':
        this.create(payload.group);
        break;
      case 'change-group':
        var group = this.get(payload.group.id);
        if (group){
          group.set(payload.group);
        }
        break;
    }
  },

  create: function(model){

    var g = new Group();

    g.save({
      title: model.title,
      description: model.description
    }, {
      silent: true,
      success: group => {

        if (model.newpicture){
          request
            .post('/api/groups/' + group.id + '/picture')
            .attach('image', model.newpicture)
            .end( (err, res) => {
              if (err) {
                this.trigger('error:create', { error: err });
                return;
              }

              group.picture = res.picture;
              this.trigger('end:create', group);
              this.add(group);
            });

          return;
        }

        this.trigger('end:create', group);
        this.add(group);
      },
      error: (model, resp, options) => {
        this.trigger('error:create', { error: resp });
      }
    });
  }


});

Groups.instance = new Groups();
export default Groups;
