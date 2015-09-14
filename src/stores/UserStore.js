
import { UserDispatcher } from "../dispatcher";

import { UserConstants } from "../constants";
import { UserAPI } from "../api";

import Store from "./Store";

class UserStore extends Store {

  __onDispatch(action) {

    switch (action.type) {
      case UserConstants.SEARCH:
        UserAPI.search(action.query);
        break;
      case UserConstants.FINDME:
        UserAPI.findMe();
        break;
      case UserConstants.UPDATEME:
        UserAPI.updateMe(action.data);
        break;
      case UserConstants.RECEIVE:
        this.__changed = this.addItems(action.users);
        break;
      case UserConstants.ERROR:
        this.throwError(action.data);
        break;
    }
  }

};

const instance = new UserStore(UserDispatcher);
export default instance;
