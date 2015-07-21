
import AppDispatcher from '../dispatcher/AppDispatcher';
import MemberConstants from '../constants/Member';

var actions = {};
actions.find = (gid) => {

  AppDispatcher.dispatch({
    type: MemberConstants.FIND,
    gid
  });

};

actions.accept = (gid) => {

  AppDispatcher.dispatch({
    type: MemberConstants.ACCEPT,
    gid
  });

};

actions.decline = (gid) => {

  AppDispatcher.dispatch({
    type: MemberConstants.DECLINE,
    gid
  });

};

actions.invite = (gid, data) => {

  AppDispatcher.dispatch({
    type: MemberConstants.INVITE,
    gid,
    data
  });

};

actions.setRole = (gid, data) => {

  AppDispatcher.dispatch({
    type: MemberConstants.SETROLE,
    gid,
    data
  });

};

actions.kick = (gid, id) => {

  AppDispatcher.dispatch({
    type: MemberConstants.KICK,
    gid,
    id
  });

};

export default actions;
