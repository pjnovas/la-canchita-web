
import { GroupDispatcher } from "../dispatcher";

import { GroupConstants, MeetingConstants } from "../constants";
import { GroupAPI } from "../api";
//import { GroupNotifier } from "../api";

import Store from "./Store";

class GroupStore extends Store {

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
        this.mergeChild(action.id, action.members, "members");
        break;
      case GroupConstants.RECEIVE_MEETINGS:
        this.mergeChild(action.id, action.meetings, "meetings");
        break;
      case GroupConstants.CREATE:
        GroupAPI.create(action.group);
        break;
      case GroupConstants.UPDATE:
        GroupAPI.update(action.id, action.group);
        break;
      case GroupConstants.DESTROY:
        GroupAPI.destroy(action.id);
        break;
      case GroupConstants.REMOVE:
        this.__changed = this.removeItem(action.id);
        break;
      case GroupConstants.ERROR:
        this.throwError(action.data);
        break;
      case GroupConstants.ACCEPT:
        GroupAPI.accept(action.id);
        break;
      case GroupConstants.REJECT:
        GroupAPI.reject(action.id);
        break;
      case GroupConstants.INVITE:
        GroupAPI.invite(action.gid, action.data);
        break;
      case GroupConstants.SETROLE:
        GroupAPI.setRole(action.gid, action.mid, action.role);
        break;
      case GroupConstants.KICK:
        GroupAPI.kick(action.gid, action.mid);
        break;
      case GroupConstants.CREATE_MEETING:
        GroupAPI.createMeeting(action.id, action.meeting);
        break;
      case MeetingConstants.REMOVE:
        let gid = this.findIdFromChild(action.id, "meetings");
        if (gid) {
          this.removeChild(gid, action.id, "meetings");
        }
        break;

        /*
      case GroupConstants.JOIN_ROOM:
        GroupNotifier.join(this.findId(action.id));
        break;
      case GroupConstants.LEAVE_ROOM:
        GroupNotifier.leave(this.findId(action.id));
        break;
        */
    }
  }

};

const instance = new GroupStore(GroupDispatcher);
export default instance;
