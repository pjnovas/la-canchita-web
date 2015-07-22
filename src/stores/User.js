
import ListStore from './ListStore';
import request from 'superagent';

import UserConstants from '../constants/User';

class GroupStore extends ListStore {

  constructor() {
    super();

    this.uri = '/api/users/';
    this.type = 'USER';

    this.events = [
      'error'
    ];

    ['search']
      .forEach( event => {
        this.events.push('before:' + event);
        this.events.push(event);
      });
  }

  dispatchCallback(payload) {

    switch (payload.type) {
      case UserConstants.SEARCH:
        this.search(payload.query);
        break;
    };

  }

  search(query) {
    this.emit('before:search');

    request
      .get(this.uri + 'search?q=' + query)
      .end( (err, res) => {
        if (this.errorHandler(err, 'search')){
          return;
        }

        this.emit('search', res.body);
      });
  }

}

export default new GroupStore();