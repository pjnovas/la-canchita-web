
import AppDispatcher from '../dispatcher/AppDispatcher';

export default {

  receiveGroups (groups) {

    AppDispatcher.dispatch({
      type: 'recieve-groups',
      groups: groups
    });

  },

  create (group) {

    AppDispatcher.dispatch({
      type: 'create-group',
      group: group
    });

  },

  update (group){

    AppDispatcher.dispatch({
      type: 'update-group',
      group: group
    });

  }

};
