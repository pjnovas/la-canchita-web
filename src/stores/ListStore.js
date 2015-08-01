
import AppDispatcher from "../dispatcher/AppDispatcher";
import { EventEmitter } from "events";
import request from "superagent";

//var DEFAULT_MAX_LISTENERS = 12

class ListStore extends EventEmitter {

  constructor() {
    super();

    this.dispatchToken = AppDispatcher.register( (payload) => {
      this.dispatchCallback(payload);
    });

    this.list = new Map();
    this.uri = "/";
    this.type = "";

    this.events = [
      "error"
    ];

    ["find", "create", "save", "destroy"]
      .forEach( event => {
        this.events.push("before:" + event);
        this.events.push(event);
      });

  }

  dispatchCallback(payload) {

    // default dispatcher
    // manage constants as [this.type]_[action]

    var parts = payload.type.split("_");
    if (parts[0] !== this.type) { // store
      return;
    }

    switch (parts[1]) {
      case "FIND":
        this.find();
        break;
      case "FINDONE":
        this.findOne(payload.id);
        break;
      case "CREATE":
        this.create(payload.data);
        break;
      case "UPDATE":
        this.update(payload.data);
        break;
      case "DESTROY":
        this.destroy(payload.id);
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

  remove(id) {
    this.list.delete(id);
  }

  find() {

    this.emit("before:find");

    request
      .get(this.uri)
      .end( (err, res) => {
        if (this.errorHandler(err, "find")){
          return;
        }

        this.add(res.body);
        this.emit("find", this.get());
      });
  }

  findOne(id) {
    if (this.list.has(id)){
      //TODO: should fire a before:find?
      this.emit("find", this.get(id));
      return;
    }

    this.emit("before:find");

    request
      .get(this.uri + id)
      .end( (err, res) => {
        if (this.errorHandler(err, "find")){
          return;
        }

        this.set(res.body);
        this.emit("find", this.get(id));
      });
  }

  create(item) {
    // override

    this.emit("before:create");

    request
      .post(this.uri)
      .send(item)
      .end( (err, res) => {
        if (this.errorHandler(err, "create")){
          return;
        }

        var nItem = res.body;
        this.add(nItem.id, nItem);
        this.emit("create", nItem);
      });
  }

  update(item) {
    // override

    this.emit("before:save");

    request
      .put(this.uri + item.id)
      .send(item)
      .end( (err, res) => {
        if (this.errorHandler(err, "save")){
          return;
        }

        var nItem = res.body;
        this.set(item.id, nItem);
        this.emit("save", nItem);
      });
  }

  destroy(id){
    //override

    this.emit("before:destroy");

    request
      .del(this.uri + id)
      .end( (err, res) => {
        if (this.errorHandler(err, "destroy")){
          return;
        }

        this.list.delete(id);
        this.emit("destroy");
      });
  }

  errorHandler(err, type){

    if (err) {

      this.emit("error", {
        store: this.type,
        type,
        status: err.status,
        response: err.response,
        body: err.response.body,
        text: err.response.text,
      });

      return true;
    }
  }

}

export default ListStore;
