
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
      "remove_meeting",
      "cancelled_meeting"
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
        this.updateGroupMember(payload.id, payload.data);
        break;
      case "new_meeting":
      case "update_meeting":
        GroupActions.receiveMeetings(payload.id, payload.data);
        break;
      case "remove_meeting":
        //GroupActions.removeMeeting(payload.id, payload.data.id);
        MeetingActions.remove(payload.data.id);
        break;
      case "cancelled_meeting":
        payload.data.cancelled = true;
        GroupActions.receiveMeetings(payload.id, payload.data);
        break;
    }

  }

  onJoin(room){

  }

  onLeave(room){

  }

  updateGroupMember(gid, members){
    let uid = window.user && window.user.id;
    if (uid){
      members = Array.isArray(members) ? members : [members];

      members.forEach( member => {
        let muid = member.user && member.user.id || member.user;
        if (muid === uid){
          GroupActions.receive({ id: gid, member: member });
          return false;
        }
      });
    }
  }
}

const instance = new GroupNotifier();
export default instance;

export const API = GroupNotifier;
