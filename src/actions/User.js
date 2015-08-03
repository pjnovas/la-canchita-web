
import AppDispatcher from "../dispatcher/AppDispatcher";
import UserConstants from "../constants/User";

var actions = {};
actions.search = (query) => {

  AppDispatcher.dispatch({
    type: UserConstants.SEARCH,
    query
  });

};

actions.findMe = () => {

  AppDispatcher.dispatch({
    type: UserConstants.FINDME
  });

};

actions.updateMe = (data) => {

  AppDispatcher.dispatch({
    type: UserConstants.UPDATE,
    data
  });

};

export default actions;
