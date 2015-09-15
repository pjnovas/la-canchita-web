
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

  findMe(){
    this.dispatcher.dispatch({
      type: this.constants.FINDME
    });
  }

  updateMe(data){
    this.dispatcher.dispatch({
      type: this.constants.UPDATEME,
      data
    });
  }

  changePassword(actual, change){
    this.dispatcher.dispatch({
      type: this.constants.CHANGEPASSWORD,
      actual,
      change
    });
  }

}

const instance = new UserActions();
export default instance;
