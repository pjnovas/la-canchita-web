
import _ from "lodash";

import { GroupConstants } from "../constants";
import { GroupDispatcher } from "../dispatcher";
import { GroupAPI } from "../api";

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

  clear(){
    this._state = this.getInitialState();
  }

  addItems(items){
    items = Array.isArray(items) && items || [ items ];

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

  mergeChild(gid, list, type){
    let current = this._state;
    list = Array.isArray(list) && list || [ list ];

    if (current.has(gid)){
      var group = current.get(gid);

      if (!group[type] || group[type].length === 0){
        group[type] = _.cloneDeep(list);
      }
      else {
        list.forEach( child => {
          let found = _.findWhere(group[type], { id: child.id });
          if (found){
            _.assign(found, _.cloneDeep(child));
          }
          else {
            group[type].push(_.cloneDeep(child));
          }
        });
      }

      this.__changed = true;
    }
  }

  __onDispatch(action) {

    switch (action.type) {
      case GroupConstants.FIND:
        GroupAPI.find();
        break;
      case GroupConstants.FINDONE:
        GroupAPI.findOne(action.id);
        break;
      case GroupConstants.RECEIVE:
        this.__changed = this.addItems(action.groups);
        break;
      case GroupConstants.RECEIVE_MEMBERS:
        this.mergeChild(action.id, action.members, 'members');
        break;
      case GroupConstants.RECEIVE_MEETINGS:
        this.mergeChild(action.id, action.meetings, 'meetings');
        break;

    }
  }

};

const instance = new GroupStore(GroupDispatcher);
export default instance;

//export const Store = GroupStore;
