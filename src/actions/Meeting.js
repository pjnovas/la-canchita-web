
import AppDispatcher from "../dispatcher/AppDispatcher";
import MeetingConstants from "../constants/Meeting";

var actions = {};

actions.find = (gid) => {

  AppDispatcher.dispatch({
    type: MeetingConstants.FIND,
    gid
  });

};

actions.findOne = (id) => {

  AppDispatcher.dispatch({
    type: MeetingConstants.FINDONE,
    id
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

actions.join = (id) => {

  AppDispatcher.dispatch({
    type: MeetingConstants.JOIN,
    id
  });

};

actions.leave = (id) => {

  AppDispatcher.dispatch({
    type: MeetingConstants.LEAVE,
    id
  });

};

actions.confirm = (id) => {

  AppDispatcher.dispatch({
    type: MeetingConstants.CONFIRM,
    id
  });

};

export default actions;
