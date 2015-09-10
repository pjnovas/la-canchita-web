
import { EventEmitter } from "events";

class WebSockets extends EventEmitter {

  constructor(){
    this.baseURL = location.origin || (location.protocol + "//" + location.host);
    this.connector = io.sails.connect;

    this.connected = false;
    this.socket = null;

    this.connect();
  }

  connect() {
    this.socket = this.connector(this.baseURL);

    this.socket.on("connect", () => {
      this.connected = true;

      /*
      this.socket.on("message", message => {
        console.log("New message received from Sails ::\n");
        console.dir(message);
      });
      */

      this.emit("connected");
    });

    this.socket.on("disconnect", () => {
      this.connected = false;
      this.emit("disconnected");
    });
  }

}

const instance = new WebSockets();
export default instance;

export const API = WebSockets;
