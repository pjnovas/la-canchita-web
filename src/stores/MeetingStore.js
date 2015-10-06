
import { GroupDispatcher } from "../dispatcher";

import { MeetingConstants } from "../constants";
import { MeetingAPI } from "../api";
import { MeetingNotifier } from "../api";

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
      case MeetingConstants.JOIN_ROOM:
        MeetingNotifier.join(action.id);
        break;
      case MeetingConstants.LEAVE_ROOM:
        MeetingNotifier.leave(action.id);
        break;
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

  getPeriod (dt, obj, type) {
    if (!obj || !obj.times){
      return moment(dt).clone();
    }

    return moment(dt).clone()[type](obj.times, obj.period);
  }

  getStageOf(meeting){
    let now = moment();
    let when = moment(meeting.when);
    let duration = meeting.duration || { times: 1, period: "hours" };

    let end = this.getPeriod(when, duration, "add");
    let historic = this.getPeriod(end, { times: 1, period: "weeks" }, "add");

    let cStart = meeting.confirmation && this.getPeriod(when, meeting.confirmStart, "subtract");
    let cEnd = meeting.confirmation && this.getPeriod(when, meeting.confirmEnd, "subtract");

    let stage = "joining";

    if (meeting.cancelled){
      stage = "cancelled";
    }
    else if (meeting.confirmation && now > cStart && now < cEnd){
      stage = "confirming";
    }
    else if (now > when && now < end) {
      stage = "running";
    }
    else if (now > end) {
      stage = "historic";

      if (now < historic){
        stage = "played";
      }
    }

    return stage;
  }

  getStage(id){
    let meeting = this.getStateById(id);

    if (!meeting){
      return "unknown";
    }

    return this.getStageOf(meeting);
  }

};

const instance = new MeetingStore(GroupDispatcher);
export default instance;
