
import { MeetingActions } from "../actions";
import Notifier from "./Notifier";

class MeetingNotifier extends Notifier {

  constructor(){
    super();
    this.roomBase += "/meetings";

    this.preEvent = "meetings";
    this.events = [
      "update",
      "remove",
      "cancelled",
      "join",
      "leave",
      "confirm"
    ];
  }

  onEvent(event, payload){
    //console.log(event, payload);

    switch(event){
      case "confirm":
      case "join":
        MeetingActions.receiveAttendees(payload.id, payload.data);
        break;
      case "leave":
        MeetingActions.removeAttendee(payload.id, payload.data.id);
        break;
      case "update":
        MeetingActions.receive(payload.data);
        break;
      case "remove":
        MeetingActions.remove(payload.id);
        break;
      case "cancelled":
        payload.data.cancelled = true;
        MeetingActions.receive(payload.data);
        break;
    }

  }


  onJoin(room){

  }

  onLeave(room){

  }

}

const instance = new MeetingNotifier();
export default instance;

export const API = MeetingNotifier;
