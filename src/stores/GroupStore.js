
import _ from 'lodash';

import GroupConstants from "../constants/GroupConstants";
import GroupDispatcher from "../dispatcher/GroupDispatcher";
import GroupAPI from "../api/GroupAPI";

import { Store } from "flux/utils";

class GroupStore extends Store {

  constructor(dispatcher) {
    super(dispatcher);
    this._state = this.getInitialState();
  }

  getInitialState() {
    return new Map();
  }

  getState() {
    // returns an array representation of the state
    return [...this._state].map(([k, v]) => _.cloneDeep(v));
  }

  addItems(items){
    let changed = false;
    let current = this._state;

    items.forEach( item => {

      if (current.has(item.id)){
        
        var currItem = current.get(item.id);
        if (!this.areEqual(item, currItem)){
          this.mergeItem(item, currItem);
          changed = true;
        }
      }
      else {
        this._state.set(item.id, _.cloneDeep(item));
        changed = true;
      }

    });

    return changed;
  }

  mergeItem(now, current){
    this._state.set(now.id, _.assign(current, _.cloneDeep(now)));
  }

  areEqual(a, b){
    return _.isEqual(a, b);
  }

  __onDispatch(action) {

    switch (action.type) {
      case "GROUP_FIND":
        GroupAPI.find();
        break;

      case "GROUP_RECEIVE":
        this.__changed = this.addItems(action.groups);
        break;

    }
  }

};

const instance = new GroupStore(GroupDispatcher);
export default instance;

//export const Store = GroupStore;
