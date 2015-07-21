
import ListStore from './ListStore';
import request from 'superagent';

import MemberConstants from '../constants/Member';

class MemberStore extends ListStore {

  constructor() {
    super();

    this.uri = '';
    this.type = 'MEMBER';

    this.events = [
      'error'
    ];

    ['find', 'join', 'leave', 'invite', 'setrole', 'kick']
      .forEach( event => {
        this.events.push('before:' + event);
        this.events.push(event);
      });
  }

  getURI(gid){
    return '/api/groups/${gid}/members/'.replace('${gid}', gid);
  }

  dispatchCallback(payload) {
    if (payload.type.split('_')[0] !== this.type){
      return;
    }

    if (!payload.gid){
      throw new Error('Expected GroupId on Member payload');
    }

    switch (payload.type) {
      case MemberConstants.FIND:
        this.find(payload.gid);
        break;
      case MemberConstants.ACCEPT:

        break;
      case MemberConstants.DECLINE:

        break;
      case MemberConstants.INVITE:

        break;
      case MemberConstants.SETROLE:

        break;
      case MemberConstants.KICK:

        break;
    };

  }

  getGroup(gid){
    if (!this.list.has(gid)){
      this.list.set(gid, new Map());
    }

    return this.list.get(gid);
  }

  get(gid, id){
    var list = this.getGroup(gid);

    if (id){
      return list.get(id);
    }

    return [...list].map(([k, v]) => v ); // to Array
  }

  add(gid, items) {
    var list = this.getGroup(gid);
    var toAdd = Array.isArray(items) ? items : [items];

    toAdd.forEach( item => {
      // TODO: merge item if already exist?
      list.set(item.id, item);
    });
  }

  find(gid) {

    if (this.list.has(gid)){
      this.emit('find', this.get(gid));
      return;
    }

    this.emit('before:find');

    request
      .get(this.getURI(gid))
      .end( (err, res) => {
        if (this.errorHandler(err, 'find')){
          return;
        }

        this.add(gid, res.body);
        this.emit('find', this.get(gid));
      });
  }

}

export default new MemberStore();
