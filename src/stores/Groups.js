
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
        if (options.silent || options.muted){
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
        this.createOne(payload.group);
        break;
      case 'update-group':
        this.updateOne(payload.group);
        //this.save(payload.group);
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

  fetchOne: function(id){

    var group = this.get(id);
    if (group){
      this.trigger('end:fetch', group);
      return;
    }

    // group not on store > fetch it from server
    group = new Group({ id: id });
    group.urlRoot = this.url;

    group.fetch({
      success: (group) => {
        this.add(group, { merge: true });
        this.trigger('end:fetch', group.toJSON());
      }
    });
  },

  updateImage: function(id, picture, done){
    request
      .post('/api/groups/' + id + '/picture')
      .attach('image', picture)
      .end( (err, res) => {
        if (err) {
          return done(err);
        }

        if (res.body.picture){
          var group = this.get(id);
          group.set('picture', res.body.picture);
        }

        done();
      });
  },

  createOne: function(model){
    this.create({
      title: model.title,
      description: model.description
    }, {
      wait: true,
      muted: true,

      success: (group) => {

        if (model.newpicture){
          this.updateImage(group.id, model.newpicture, (err) => {
            if (err){
              this.trigger('error:create', { error: err });
            }

            this.trigger('end:create', group.toJSON());
          });

          return;
        }

        this.trigger('end:create', group);
      }

    });
  },

  updateOne: function(model){
    var group = this.get(model.id);

    function savePicture(_group){
      this.updateImage(_group.id, model.newpicture, (err) => {
        if (err){
          this.trigger('error:save', { error: err });
        }

        this.trigger('end:save', _group.toJSON());
      });
    }

    if ( // has changes on group
      group.get('title') !== model.title ||
      group.get('description') !== model.description
    ){

      group.save({
        title: model.title,
        description: model.description
      }, {
        patch: true,
        muted: true,
        wait: true,

        success: (group) => {
          if (model.newpicture){
            return savePicture.call(this, group);
          }
          this.trigger('end:save', group);
        }

      });

    } else if (model.newpicture){
      savePicture.call(this, group);
    }

  },

});

export default new GroupsStore();
