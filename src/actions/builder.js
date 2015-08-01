
import AppDispatcher from "../dispatcher/AppDispatcher";

export default function(constants){

  return {

    find() {

      AppDispatcher.dispatch({
        type: constants.FIND
      });

    },

    findOne(id) {

      AppDispatcher.dispatch({
        type: constants.FINDONE,
        id
      });

    },

    create(data) {

      AppDispatcher.dispatch({
        type: constants.CREATE,
        data
      });

    },

    update(data) {

      AppDispatcher.dispatch({
        type: constants.UPDATE,
        data
      });

    },

    destroy(id) {

      AppDispatcher.dispatch({
        type: constants.DESTROY,
        id
      });

    }

  };

};
