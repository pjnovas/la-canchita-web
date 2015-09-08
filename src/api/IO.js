
import request from "superagent";

export default class IO {

  // Aliases - Fast accessors

  find() {
    this.get().then( entities => {
      this.actions.receive(entities);
    });
  }

  findOne(id) {
    this.get(id).then( entity => {
      this.actions.receive(entity);
    });
  }

  create(data){
    this.post("", data).then( entity => {
      this.actions.receive(entity);
    });
  }

  update(id, data){
    this.put(id, data).then( entity => {
      this.actions.receive(entity);
    });
  }

  destroy(id, data){
    this.del(id, data).then( () => {
      this.actions.remove(id);
    });
  }

  // HTTP Requests with promises

  get(uri) {
    return this.request("get", this.uri + (uri || ""));
  }

  post(uri, data){
    return this.request("post", this.uri + (uri || ""), data);
  }

  put(uri, data){
    return this.request("put", this.uri + (uri || ""), data);
  }

  del(uri, data){
    return this.request("del", this.uri + (uri || ""), data);
  }

  request(method, uri, data){
    return new Promise( (resolve, reject) => {

      request[method || "get"](uri)
        .send(data)
        .end( (err, res) => {
          if (this.errorHandler(err, method + ":" + uri)){
            reject();
            return;
          }
          
          resolve(res.body);
        });
    });
  }

  errorHandler(err, type){

    if (err) {
      this.actions.error({
        api: this.type,
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
