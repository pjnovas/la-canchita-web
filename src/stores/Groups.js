
import AppDispatcher from '../dispatcher/AppDispatcher';
import Backbone from 'backbone';
import request from 'superagent';

import Group from '../models/Group';
import Groups from '../models/Groups';

var GroupsStore = Backbone.Collection.extend({

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
      case 'update-group':
        this.save(payload.group);
        break;
      case 'change-group':
        var group = this.get(payload.group.id);
        if (group){
          group.set(payload.group);
        }
        break;
    }
  },

  getAll: function(){
    var collection = new Groups(this.toJSON());
    return collection.toJSON();
  },

  getOne: function(id){
    var group = this.get(id);
    return group.toJSON();
  },

  fetchOne: function(id){
    var group = new Group({ id: id });
    group.urlRoot = this.url;

    group.fetch({
      success: (group) => {
        this.add(group, { merge: true });
        this.trigger('end:fetch');
      }
    });
  },

  save: function(model){
    var group = new Group(model);
    group.urlRoot = this.url;

    var isNew = group.isNew();
    var event = isNew ? 'create' : 'save';

    var done = group => {
      this.add(group, { merge: true });
      this.trigger('end:' + event, group.toJSON());
    };

    group.save({
      title: model.title,
      description: model.description
    }, {
      patch: !isNew,
      silent: true,
      success: group => {

        if (model.newpicture){
          request
            .post('/api/groups/' + group.id + '/picture')
            .attach('image', model.newpicture)
            .end( (err, res) => {
              if (err) {
                this.trigger('error:' + event, { error: err });
                return;
              }

              group.set('picture', res.body.picture);
              done(group);
            });

          return;
        }

        done(group);
      },
      error: (model, resp, options) => {
        this.trigger('error:' + event, { error: resp });
      }
    });

  }


});

export default new GroupsStore();
