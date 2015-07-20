
import ListStore from './ListStore';
import request from 'superagent';

import GroupConstants from '../constants/Group';

class GroupStore extends ListStore {

  constructor() {
    super();

    this.uri = '/api/groups/';
    this.type = 'GROUP';

    this.events = this.events.concat([
      // custom events here
    ]);
  }

  dispatchCallback(payload) {

    super.dispatchCallback(payload);

    switch (payload.type) {
      case GroupConstants.CUSTOM:
        //something
        break;
    };

    /* DEFAULTS
    switch (payload.type) {
      case GroupConstants.RECIEVE:
        this.add(payload.data);
        break;
      case GroupConstants.CREATE:
        this.create(payload.data);
        break;
      case GroupConstants.UPDATE:
        this.update(payload.data);
        break;
      case GroupConstants.DESTROY:
        this.destroy(payload.data);
        break;
    }
    */
  }

  sendImage (id, picture, done) {

    request
      .post(this.uri + id + '/picture')
      .attach('image', picture)
      .end( (err, res) => {
        if (err) {
          return done(err);
        }

        if (res.body.picture){
          this.get(id).picture = res.body.picture;
        }

        done();
      });
  }

  send (type, item) {
    this.emit('start:' + type);

    var method = (type === 'create' ? 'post' : 'put');
    var uri = (type === 'create' ? this.uri : this.uri + item.id);

    request[method](uri)
      .send({
        title: item.title,
        description: item.description
      })
      .end( (err, res) => {
        if (err){
          this.emit('error:' + type, err);
          return;
        }

        var group = res.body;
        if (type === 'create'){
          this.add(group);
        }
        else {
          this.set(group);
        }

        if (item.newpicture){
          this.sendImage(group.id, item.newpicture, (err) => {
            if (err){
              this.emit('error:' + type, err);
              return;
            }

            this.emit('end:' + type, group);
          });

          return;
        }

        this.emit('end:' + type, group);
      });
  }

  create(item) {
    this.send('create', item);
  }

  update(item) {
    this.send('save', item);
  }

}

export default new GroupStore();