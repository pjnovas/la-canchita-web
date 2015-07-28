
import AppDispatcher from '../dispatcher/AppDispatcher';
import GroupConstants from '../constants/Group';
import builder from './builder';

var actions = builder(GroupConstants);

actions.accepted = (id, member) => {

  AppDispatcher.dispatch({
    type: GroupConstants.ACCEPTED,
    id,
    member
  });

};

actions.declined = (id) => {

  AppDispatcher.dispatch({
    type: GroupConstants.DECLINED,
    id
  });

};

export default actions;
