
import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import request from 'superagent';

//var DEFAULT_MAX_LISTENERS = 12

class ListStore extends EventEmitter {

  constructor() {
    super();

    this.dispatchToken = AppDispatcher.register( (payload) => {
      this.dispatchCallback(payload);
    });

    this.list = new Map();
    this.uri = '/';
    this.type = '';

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

    // default dispatcher
    // manage constants as [this.type]_[action]

    var parts = payload.type.split('_');
    if (parts[0] !== this.type) { // store
      return;
    }

    switch (parts[1]) {
      case 'RECIEVE':
        this.add(payload.data);
        break;
      case 'CREATE':
        this.create(payload.data);
        break;
      case 'UPDATE':
        this.update(payload.data);
        break;
      case 'DESTROY':
        this.destroy(payload.data);
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

    toAdd.forEach( item => {
      // TODO: merge item if already exist?
      this.list.set(item.id, item);
    });
  }

  set(item) {
    // TODO: merge item ?
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

  create(item) {
    // override

    this.emit('start:create');

    request
      .post(this.uri)
      .send(item)
      .end( (err, res) => {
        if (err){
          this.emit('error:create', err);
          return;
        }

        var nItem = res.body;
        this.add(nItem.id, nItem);
        this.emit('end:create', nItem);
      });
  }

  update(item) {
    // override

    this.emit('start:save');

    request
      .put(this.uri + item.id)
      .send(item)
      .end( (err, res) => {
        if (err){
          this.emit('error:save', err);
          return;
        }

        var nItem = res.body;
        this.set(item.id, nItem);
        this.emit('end:save', nItem);
      });
  }

  destroy(item){
    //override

    this.emit('start:destroy');

    request
      .del(this.uri + item.id)
      .end( (err, res) => {
        if (err){
          this.emit('error:destroy', err);
          return;
        }

        this.list.delete(item.id);
        this.emit('end:destroy');
      });
  }

}

export default ListStore;
