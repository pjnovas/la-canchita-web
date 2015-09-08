
import _ from "lodash";
import { Store as FluxStore } from "flux/utils";

class Store extends FluxStore {

  constructor(dispatcher) {
    super(dispatcher);

    this.__errorEvent = "error";

    this.idAttr = this.idAttr || "id";
    this.childIdAttr = this.childIdAttr || "id";

    this._state = this.getInitialState();
  }

  onError(callback) {
    return this.__emitter.addListener(this.__errorEvent, callback);
  }

  throwError(data){
    this.__emitter.emit(this.__errorEvent, data);
  }

  getInitialState() {
    return new Map();
  }

  getState() {
    // returns an array representation of the state
    return [...this._state].map(([k, v]) => _.cloneDeep(v));
  }

  getStateById(id){
    return _.cloneDeep(this._state.get(id));
  }

  clear(){
    this._state = this.getInitialState();
  }

  addItems(items){
    const idAttr = this.idAttr;
    items = Array.isArray(items) && items || [ items ];

    let changed = false;
    let current = this._state;

    items.forEach( item => {
      if (!item[idAttr]) { throw new Error("Store: Expected [id] property"); }

      if (current.has(item[idAttr])){

        var currItem = current.get(item[idAttr]);
        if (!this.areEqual(item, currItem)){
          this._state.set(item[idAttr], _.assign(currItem, _.cloneDeep(item)));
          changed = true;
        }
      }
      else {
        this._state.set(item[idAttr], _.cloneDeep(item));
        changed = true;
      }

    });

    return changed;
  }

  areEqual(a, b){
    return _.isEqual(a, b);
  }

  removeItem(id){
    let current = this._state;
    let changed = false;

    if (current.has(id)){
      current.delete(id);
      changed = true;
    }

    return changed;
  }

  mergeChild(id, list, type, overrideIdAttr){
    const idAttr = overrideIdAttr || this.childIdAttr;
    let current = this._state;
    list = Array.isArray(list) && list || [ list ];

    if (!current.has(id)){ //if no parent, create one
      this._state.set(id, { [this.idAttr] : id });
    }

    var entity = current.get(id);

    if (!entity[type] || entity[type].length === 0){
      entity[type] = _.cloneDeep(list);
    }
    else {
      list.forEach( child => {
        if (!child[idAttr]) { throw new Error("Store: Expected [child.id] property"); }

        let found = _.findWhere(entity[type], { [idAttr]: child[idAttr] });
        if (found){
          _.assign(found, _.cloneDeep(child));
        }
        else {
          entity[type].push(_.cloneDeep(child));
        }
      });
    }

    this.__changed = true;
  }

  removeChild(id, childId, type, overrideIdAttr){
    const idAttr = overrideIdAttr || this.childIdAttr;
    let current = this._state;

    if (current.has(id)){
      var entity = current.get(id);

      entity[type].forEach( (child, i) => {
        if (child[idAttr] === childId){
          entity[type].splice(i, 1);
          this.__changed = true;
          return false; // break loop
        }
      });
    }
  }

  findIdFromChild(childId, type, overrideIdAttr){
    const idAttr = this.idAttr;
    const cIdAttr = overrideIdAttr || this.childIdAttr;
    let id, list = this.getState();

    list.forEach( entity => {
      let found = _.findWhere(entity[type] || [], { [cIdAttr]: childId });
      if (found){
        id = entity[idAttr];
        return false; //break loop
      }
    });

    return id;
  }

/*
  __onDispatch(action) {
    // MUST Override
  }
*/

};

export default Store;
