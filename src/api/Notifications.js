
import { GroupActions } from "../actions";
import Notifier from "./Notifier";

class Notifications extends Notifier {

  constructor(){
    super();
    this.roomBase += "/notifications";

    this.events = [
      "new_invite"
    ];
  }

  onEvent(event, payload){
    //console.log(event, payload);

    switch(event){
      case "new_invite":
        GroupActions.receive(payload.data);
        break;
    }

  }

  onJoin(room){

  }

  onLeave(room){

  }
}

const instance = new Notifications();
export default instance;

export const API = Notifications;
