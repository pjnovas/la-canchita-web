
import { UserDispatcher } from "../dispatcher";
import { UserConstants } from "../constants";
import Actions from "./Actions";

class UserActions extends Actions {

  constructor(){
    this.dispatcher = UserDispatcher;
    this.constants = UserConstants;
    this.list = "users";
    this.entity = "user";
  }

  search(query) {
    this.dispatcher.dispatch({
      type: this.constants.SEARCH,
      query
    });
  }

}

const instance = new UserActions();
export default instance;
