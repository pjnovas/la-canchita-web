
import AppDispatcher from "../dispatcher/AppDispatcher";
import MeetingConstants from "../constants/Meeting";

var actions = {};

actions.find = (gid) => {

  AppDispatcher.dispatch({
    type: MeetingConstants.FIND,
    gid
  });

};

actions.findOne = (gid, mid) => {

  AppDispatcher.dispatch({
    type: MeetingConstants.FINDONE,
    gid,
    mid
  });

};

actions.create = (gid, data) => {

  AppDispatcher.dispatch({
    type: MeetingConstants.CREATE,
    gid,
    data
  });

};

actions.update = (gid, data) => {

  AppDispatcher.dispatch({
    type: MeetingConstants.UPDATE,
    gid,
    data
  });

};

actions.destroy = (gid, id) => {

  AppDispatcher.dispatch({
    type: MeetingConstants.DESTROY,
    gid,
    id
  });

};

actions.join = (gid, id) => {

  AppDispatcher.dispatch({
    type: MeetingConstants.JOIN,
    gid,
    id
  });

};

actions.leave = (gid, id) => {

  AppDispatcher.dispatch({
    type: MeetingConstants.LEAVE,
    gid,
    id
  });

};

actions.confirm = (gid, id) => {

  AppDispatcher.dispatch({
    type: MeetingConstants.CONFIRM,
    gid,
    id
  });

};

export default actions;
