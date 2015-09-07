
import { GroupDispatcher } from "../dispatcher";
import { GroupConstants } from "../constants";
import Actions from "./Actions";

class GroupActions extends Actions {

  constructor(){
    this.dispatcher = GroupDispatcher;
    this.constants = GroupConstants;
    this.list = "groups";
    this.entity = "group";
  }

  receiveMembers(id, members) {
    this.dispatcher.dispatch({
      type: this.constants.RECEIVE_MEMBERS,
      id,
      members
    });
  }

  receiveMeetings(id, meetings) {
    this.dispatcher.dispatch({
      type: this.constants.RECEIVE_MEETINGS,
      id,
      meetings
    });
  }

  accept(id) {
    this.dispatcher.dispatch({
      type: this.constants.ACCEPT,
      id
    });
  }

  reject(id) {
    this.dispatcher.dispatch({
      type: this.constants.REJECT,
      id
    });
  }

  invite(gid, data) {
    this.dispatcher.dispatch({
      type: this.constants.INVITE,
      gid,
      data
    });
  }

  setRole(gid, mid, role) {
    this.dispatcher.dispatch({
      type: this.constants.SETROLE,
      gid,
      mid,
      role
    });
  }

  kick(gid, mid) {
    this.dispatcher.dispatch({
      type: this.constants.KICK,
      gid,
      mid
    });
  }

}

const instance = new GroupActions();
export default instance;
