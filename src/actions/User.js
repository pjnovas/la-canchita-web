
import AppDispatcher from '../dispatcher/AppDispatcher';
import UserConstants from '../constants/User';

var actions = {};
actions.search = (query) => {

  AppDispatcher.dispatch({
    type: UserConstants.SEARCH,
    query
  });

};

export default actions;
