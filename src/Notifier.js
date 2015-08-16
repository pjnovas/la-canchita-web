
import { EventEmitter } from "events";

class Notifier extends EventEmitter {

  constructor() {
    super();

    // TODO: some configs
    this.socket = null;
    this.online = false;
  }

  connect(){
    this.socket = io.sails.connect();

    this.socket.on("connect", () => {

      this.online = true;
      console.log("<< WebSocket is now connected >>");
      this.emit("connected");

      this.socket.on("message", message => {
        console.log("New message received from Sails ::\n");
        console.dir(message);
      });

    });

  }

  join(room){

    if (!this.online){
      this.once("connected", (() => this.join(room)).bind(this));
      return;
    }

    console.log("connecting to room %s ...", room);
    this.socket.post(room, res => {
      console.log("Now connected to room ", room);
      console.dir(res);
    });

    this.socket.on("meetings:join", message => {
      console.log("Meeting JOIN ::\n");
      console.dir(message);
    });

    this.socket.on("meetings:leave", message => {
      console.log("Meeting LEAVE ::\n");
      console.dir(message);
    });
  }

};

export default new Notifier();
