
import { GroupDispatcher } from "../dispatcher";
import { MeetingConstants } from "../constants";
import Actions from "./Actions";

class MeetingActions extends Actions {

  constructor(){
    this.dispatcher = GroupDispatcher;
    this.constants = MeetingConstants;
    this.list = "meetings";
    this.entity = "meeting";
  }

  receiveAttendees(id, attendees) {
    this.dispatcher.dispatch({
      type: this.constants.RECEIVE_ATTENDEES,
      id,
      attendees
    });
  }

  removeAttendee(id, aid) {
    this.dispatcher.dispatch({
      type: this.constants.REMOVE_ATTENDEE,
      id,
      aid
    });
  }

  removeMe(id) {
    this.dispatcher.dispatch({
      type: this.constants.REMOVE_ATTENDEE_ME,
      id
    });
  }

  join(id) {
    this.dispatcher.dispatch({
      type: this.constants.JOIN,
      id
    });
  }

  leave(id) {
    this.dispatcher.dispatch({
      type: this.constants.LEAVE,
      id
    });
  }

  confirm(id) {
    this.dispatcher.dispatch({
      type: this.constants.CONFIRM,
      id
    });
  }

}

const instance = new MeetingActions();
export default instance;
