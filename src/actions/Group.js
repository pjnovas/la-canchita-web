
import AppDispatcher from '../dispatcher/AppDispatcher';

export default {

  receiveGroups: function(groups) {

    AppDispatcher.dispatch({
      type: 'recieve-groups',
      groups: groups
    });

  },

  createGroup: function(group) {

    AppDispatcher.dispatch({
      type: 'create-group',
      group: group
    });

  },

};
