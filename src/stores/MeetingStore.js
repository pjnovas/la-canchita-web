
import { GroupDispatcher } from "../dispatcher";

import { MeetingConstants } from "../constants";
import { MeetingAPI } from "../api";
//import { MeetingNotifier } from "../api";

import Store from "./Store";

class MeetingStore extends Store {

  __onDispatch(action) {

    switch (action.type) {
      case MeetingConstants.FINDONE:
        MeetingAPI.findOne(action.id);
        break;
      case MeetingConstants.RECEIVE:
        this.__changed = this.addItems(action.meetings);
        break;
      case MeetingConstants.RECEIVE_ATTENDEES:
        this.mergeChild(action.id, action.attendees, "attendees");
        break;
      case MeetingConstants.REMOVE_ATTENDEE:
        this.removeChild(action.id, action.aid, "attendees");
        break;
      case MeetingConstants.REMOVE_ATTENDEE_ME:
        this.removeMe(action.id);
        break;
      case MeetingConstants.UPDATE:
        MeetingAPI.update(action.id, action.meeting);
        break;
      case MeetingConstants.DESTROY:
        MeetingAPI.destroy(action.id);
        break;
      case MeetingConstants.REMOVE:
        this.__changed = this.removeItem(action.id);
        break;
      case MeetingConstants.ERROR:
        this.throwError(action.data);
        break;
      case MeetingConstants.JOIN:
        MeetingAPI.join(action.id);
        break;
      case MeetingConstants.LEAVE:
        MeetingAPI.leave(action.id);
        break;
      case MeetingConstants.CONFIRM:
        MeetingAPI.confirm(action.id);
        break;
        /*
      case MeetingConstants.JOIN_ROOM:
        MeetingNotifier.join(this.findId(action.id));
        break;
      case MeetingConstants.LEAVE_ROOM:
        MeetingNotifier.leave(this.findId(action.id));
        break;
        */
    }
  }

  removeMe(mid){
    let meeting = this._state.get(mid);

    if (!meeting){
      return;
    }

    let me = window.user.id;

    meeting.attendees.forEach( (attendee, i) => {
      if (attendee.user && attendee.user.id === me){
        meeting.attendees.splice(i, 1);
        this.__changed = true;
        return false; // break loop
      }
    });
  }

};

const instance = new MeetingStore(GroupDispatcher);
export default instance;
