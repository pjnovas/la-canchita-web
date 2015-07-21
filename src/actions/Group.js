
import AppDispatcher from '../dispatcher/AppDispatcher';
import GroupConstants from '../constants/Group';
import builder from './builder';

var actions = builder(GroupConstants);

actions.custom = (data) => {

  AppDispatcher.dispatch({
    type: GroupConstants.CUSTOM,
    data
  });

};

export default actions;
