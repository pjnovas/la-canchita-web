
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

      'start:destroy',
      'error:destroy',
      'end:destroy'
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
      case 'destroy-group':
        this.destroy(payload.group);
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

  send (type, item) {
    this.emit('start:' + type);

    var method = (type === 'create' ? 'post' : 'put');
    var uri = (type === 'create' ? this.uri : this.uri + item.id);

    request[method](uri)
      .send({
        title: item.title,
        description: item.description
      })
      .end( (err, res) => {
        if (err){
          this.emit('error:' + type, err);
        }

        var group = res.body;
        if (type === 'create'){
          this.add(group);
        }
        else {
          this.set(group);
        }

        if (item.newpicture){
          this.sendImage(group.id, item.newpicture, (err) => {
            if (err){
              this.emit('error:' + type, err);
            }

            this.emit('end:' + type, group);
          });

          return;
        }

        this.emit('end:' + type, group);
      });
  }

  create(item) {
    this.send('create', item);
  }

  update(item) {
    this.send('save', item);
  }

  destroy(item){
    this.emit('start:destroy');

    request
      .del(this.uri + item.id)
      .end( (err, res) => {
        if (err){
          this.emit('error:destroy', err);
        }

        this.list.delete(item.id);
        this.emit('end:destroy');
      });
  }

}

export default new GroupStore();