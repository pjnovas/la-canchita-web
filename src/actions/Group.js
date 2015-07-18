
import AppDispatcher from '../dispatcher/AppDispatcher';

export default {

  receiveGroups (groups) {

    AppDispatcher.dispatch({
      type: 'recieve-groups',
      groups: groups
    });

  },

  createGroup (group) {

    AppDispatcher.dispatch({
      type: 'create-group',
      group: group
    });

  },

  changeGroup (group) {

    AppDispatcher.dispatch({
      type: 'change-group',
      group: group
    });

  }

};
