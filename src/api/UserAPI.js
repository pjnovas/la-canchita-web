
import { UserActions } from "../actions";
import IO from "./IO";

class UserAPI extends IO {

  constructor(){
    this.uri = "/api/users/";
    this.type = "USER";
    this.actions = UserActions;
  }

  search(query) {
    this.get("search?q=" + query).then( users => {
      this.actions.receive(users);
    });
  }

  findMe(){
    this.get("me").then( user => {
      this.actions.receive(user);
    });
  }

  updateMe(data){
    this.put("me", data).then( user => {
      this.actions.receive(user);
    });
  }

}

const instance = new UserAPI();
export default instance;

export const API = UserAPI;
