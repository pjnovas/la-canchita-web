
import AppDispatcher from '../dispatcher/AppDispatcher';
import GroupConstants from '../constants/Group';

export default {

  receiveGroups (groups) {

    AppDispatcher.dispatch({
      type: GroupConstants.RECEIVE,
      data: groups
    });

  },

  create (group) {

    AppDispatcher.dispatch({
      type: GroupConstants.CREATE,
      data: group
    });

  },

  update (group){

    AppDispatcher.dispatch({
      type: GroupConstants.UPDATE,
      data: group
    });

  },

  destroy (group){

    AppDispatcher.dispatch({
      type: GroupConstants.DESTROY,
      data: group
    });

  }

};
