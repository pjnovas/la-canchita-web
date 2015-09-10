
import { GroupActions, MeetingActions } from "../actions";
import Notifier from "./Notifier";

class GroupNotifier extends Notifier {

  constructor(){
    super();
    this.roomBase += "/groups";

    this.preEvent = "groups";
    this.events = [
      "update",
      "remove",
      "new_members",
      "update_member",
      "new_meeting",
      "update_meeting",
      "remove_meeting"
    ];
  }

  onEvent(event, payload){
    //console.log(event, payload);

    switch(event){
      case "update":
        GroupActions.receive(payload.data);
        break;
      case "remove":
        GroupActions.remove(payload.id);
        break;
      case "new_members":
      case "update_member":
        GroupActions.receiveMembers(payload.id, payload.data);
        break;
      case "new_meeting":
      case "update_meeting":
        GroupActions.receiveMeetings(payload.id, payload.data);
        break;
      case "remove_meeting":
        //GroupActions.removeMeeting(payload.id, payload.data.id);
        MeetingActions.remove(payload.data.id);
        break;
    }

  }

  onJoin(room){

  }

  onLeave(room){

  }
}

const instance = new GroupNotifier();
export default instance;

export const API = GroupNotifier;
