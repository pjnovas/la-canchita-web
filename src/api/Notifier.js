
import WebSockets from "./WebSockets";

export default class Notifier {

  constructor(){
    this.roomBase = "/ws";

    this.currentRoom = {
      name: "",
      state: "none"
    };

    this.retryTimer = null;

    this.preEvent = "";
    this.events = [];
  }

  getSocket() {
    return WebSockets.socket;
  }

  isConnected(){
    return WebSockets.connected;
  }

  onJoin(room){
    // method called when joined a room
    // this.getSocket().on('room:event', callback);
  }

  onLeave(room){
    // method called when left a room
    // this.getSocket().off('room:event');
  }

  onEvent(event, data){
    // method called when an event is fired
  }

  suscribe(){
    let socket = this.getSocket();

    let pre = this.preEvent;
    pre = pre ? pre + ":" : "";

    this.events.forEach( ev => {
      let evName = pre + ev;

      socket.on(evName, data => {
        if (this.currentRoom.name === data.id){

          let duser = data.user && data.user.id || "-";
          let wuser = window.user && window.user.id || "x";
          if (duser === wuser){
            return; // don't notify
          }

          this.onEvent(ev, data);
        }
      });
    });
  }

  unsuscribe(){
    let socket = this.getSocket();

    let pre = this.preEvent;
    pre = pre ? pre + ":" : "";

    this.events.forEach( ev => {
      let evName = pre + ev;
      socket.off(evName);
    });
  }

  join(room) {

    if (!this.isConnected()){
      this.retryTimer = setTimeout(() => this.join(room), 1000);
      return;
    }

    if (this.currentRoom.name === room
      && ["joining", "joined"].indexOf(this.currentRoom.state) > -1){
      // already joining or joined to this room
      return;
    }

    this.currentRoom.name = room;
    this.currentRoom.state = "joining";

    this.getSocket().post(this.roomBase + "/" + room, res => {
      //console.log("Now connected to room ", this.roomBase + "/" + room);
      this.currentRoom.joined = true;
      this.suscribe();
      this.onJoin(room);
    });
  }

  leave(room) {
    clearTimeout(this.retryTimer);

    if (!this.isConnected()){
      this.currentRoom.name = "";
      this.currentRoom.state = "none";
      return;
    }

    if (this.currentRoom.name === room
      && ["joining", "joined"].indexOf(this.currentRoom.state) > -1){

        this.getSocket().delete(this.roomBase + "/" + room, res => {
          //console.log("Now disconnected from room ", this.roomBase + "/" + room);
          this.unsuscribe();
          this.onLeave(room);
        });
    }
  }

}
