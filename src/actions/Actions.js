
export default class Actions {

  find() {
    this.dispatcher.dispatch({
      type: this.constants.FIND
    });
  }

  findOne(id) {
    this.dispatcher.dispatch({
      type: this.constants.FINDONE,
      id
    });
  }

  receive(list) {
    this.dispatcher.dispatch({
      type: this.constants.RECEIVE,
      [this.list]: list
    });
  }

  create(entity) {
    this.dispatcher.dispatch({
      type: this.constants.CREATE,
      [this.entity]: entity
    });
  }

  update(id, entity) {
    this.dispatcher.dispatch({
      type: this.constants.UPDATE,
      id,
      [this.entity]: entity
    });
  }

  destroy(id) {
    this.dispatcher.dispatch({
      type: this.constants.DESTROY,
      id
    });
  }

  remove(id) {
    this.dispatcher.dispatch({
      type: this.constants.REMOVE,
      id
    });
  }

  error(data){
    this.dispatcher.dispatch({
      type: this.constants.ERROR,
      data
    });
  }

}
