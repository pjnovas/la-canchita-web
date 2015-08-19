
import GroupDispatcher from "../dispatcher/GroupDispatcher";
import GroupConstants from "../constants/GroupConstants";

export default {

  find() {
    GroupDispatcher.dispatch({
      type: GroupConstants.FIND
    });
  },

  findOne(id) {

    GroupDispatcher.dispatch({
      type: GroupConstants.FINDONE,
      id
    });

  },

  receive(groups) {
    GroupDispatcher.dispatch({
      type: GroupConstants.RECEIVE,
      groups
    });
  },

  receiveMembers(id, members) {
    GroupDispatcher.dispatch({
      type: GroupConstants.RECEIVE_MEMBERS,
      id,
      members
    });
  },

  receiveMeetings(id, meetings) {
    GroupDispatcher.dispatch({
      type: GroupConstants.RECEIVE_MEETINGS,
      id,
      meetings
    });
  },

};
