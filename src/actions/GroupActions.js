
import GroupDispatcher from "../dispatcher/GroupDispatcher";
import GroupConstants from "../constants/GroupConstants";

export default {

  find() {
    GroupDispatcher.dispatch({
      type: GroupConstants.FIND
    });
  },

  receive(groups) {
    GroupDispatcher.dispatch({
      type: GroupConstants.RECEIVE,
      groups
    });
  },

};
