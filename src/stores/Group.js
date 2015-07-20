
import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import request from 'superagent';

//var DEFAULT_MAX_LISTENERS = 12

class GroupStore extends EventEmitter {

  constructor() {
    super();

    this.dispatchToken = AppDispatcher.register( (payload) => {
      this.dispatchCallback(payload);
    });

    this.list = new Map();
    this.uri = '/api/groups/';

    this.events = [
      'start:fetch',
      'error:fetch',
      'end:fetch',

      'start:create',
      'error:create',
      'end:create',

      'start:save',
      'error:save',
      'end:save',

      'start:delete',
      'error:delete',
      'end:delete'
    ];
  }

  dispatchCallback(payload) {
    switch (payload.type) {
      case 'recieve-groups':
        this.add(payload.groups);
        break;
      case 'create-group':
        this.create(payload.group);
        break;
      case 'update-group':
        this.update(payload.group);
        break;
    }
  }

  get(id){

    if (id){
      return this.list.get(id);
    }

    return [...this.list].map(([k, v]) => v ); // to Array
  }

  add(items) {
    var toAdd = Array.isArray(items) ? items : [items];

    toAdd.forEach( group => {
      // TODO: merge group if already exist?
      this.list.set(group.id, group);
    });
  }

  set(item) {
    // TODO: merge group ?
    this.add(item);
  }

  fetch() {

    this.emit('start:fetch');

    request
      .get(this.uri)
      .end( (err, res) => {
        this.add(res.body);
        this.emit('end:fetch');
      });
  }

  fetchOne(id) {
    if (this.list.has(id)){
      //TODO: should fire a start:fetch?
      this.emit('end:fetch');
      return;
    }

    this.emit('start:fetch');

    request
      .get(this.uri + id)
      .end( (err, res) => {
        this.set(res.body);
        this.emit('end:fetch');
      });
  }

  sendImage (id, picture, done) {

    request
      .post(this.uri + id + '/picture')
      .attach('image', picture)
      .end( (err, res) => {
        if (err) {
          return done(err);
        }

        if (res.body.picture){
          this.get(id).picture = res.body.picture;
        }

        done();
      });
  }

  create(item) {

    this.emit('start:create');

    request
      .post(this.uri)
      .send({
        title: item.title,
        description: item.description
      })
      .end( (err, res) => {
        if (err){
          this.emit('error:create', err);
        }

        var group = res.body;
        this.add(group);

        if (item.newpicture){
          this.sendImage(group.id, item.newpicture, (err) => {
            if (err){
              this.emit('error:create', err);
            }

            this.emit('end:create', group);
          });

          return;
        }

        this.emit('end:create', group);
      });
  }

  update(item) {

    this.emit('start:save');

    request
      .put(this.uri + item.id)
      .send({
        title: item.title,
        description: item.description
      })
      .end( (err, res) => {
        if (err){
          this.emit('error:save', err);
        }

        var group = res.body;
        this.set(group);

        if (item.newpicture){
          this.sendImage(group.id, item.newpicture, (err) => {
            if (err){
              this.emit('error:save', err);
            }

            this.emit('end:save', group);
          });

          return;
        }

        this.emit('end:save', group);
      });
  }

}

export default new GroupStore();