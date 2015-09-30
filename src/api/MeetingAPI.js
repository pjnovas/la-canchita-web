
import { MeetingActions, GroupActions } from "../actions";
import IO from "./IO";

class MeetingAPI extends IO {

  constructor(){
    this.uri = "/api/meetings/";
    this.type = "MEETING";
    this.actions = MeetingActions;
  }

  join(id){
    this.post(id + "/attendees/me").then( attendee => {
      MeetingActions.receiveAttendees(id, attendee);
    });
  }

  leave(id){
    this.del(id + "/attendees/me").then( () => {
      MeetingActions.removeMe(id);
    });
  }

  confirm(id){
    this.post(id + "/confirmed/me").then( attendee => {
      MeetingActions.receiveAttendees(id, attendee);
    });
  }

  destroy(id, data){
    this.del(id, data).then( (meeting) => {
      if (meeting && meeting.cancelled) {
        this.actions.receive(meeting);
        GroupActions.receiveMeetings(meeting.group.id || meeting.group, meeting);
      }
      else {
        this.actions.remove(id);
      }
    });
  }

}

const instance = new MeetingAPI();
export default instance;

export const API = MeetingAPI;
