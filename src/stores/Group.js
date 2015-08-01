
import ListStore from "./ListStore";
import request from "superagent";

import GroupConstants from "../constants/Group";

class GroupStore extends ListStore {

  constructor() {
    super();

    this.uri = "/api/groups/";
    this.type = "GROUP";

    this.events = this.events.concat([
      "change", "remove"
    ]);
  }

  dispatchCallback(payload) {

    super.dispatchCallback(payload);

    switch (payload.type) {
      case GroupConstants.ACCEPTED:
        var group = this.get(payload.id);
        //group.member = payload.member;
        group.member.role = "member";
        group.member.state = "active";
        this.emit("change", this.get(), group);
        break;
      case GroupConstants.DECLINED:
        this.remove(payload.id);
        this.emit("remove", this.get(), payload.id);
        break;
    };
  }

  sendImage (id, picture, done) {

    request
      .post(this.uri + id + "/picture")
      .attach("image", picture)
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
    this.emit("before:" + type);

    var method = (type === "create" ? "post" : "put");
    var uri = (type === "create" ? this.uri : this.uri + item.id);

    request[method](uri)
      .send({
        title: item.title,
        description: item.description
      })
      .end( (err, res) => {
        if (this.errorHandler(err, type)){
          return;
        }

        var group = res.body;
        if (type === "create"){
          this.add(group);
        }
        else {
          this.set(group);
        }

        if (item.newpicture){
          this.sendImage(group.id, item.newpicture, (err) => {
            if (this.errorHandler(err, type)){
              return;
            }

            this.emit(type, group);
          });

          return;
        }

        this.emit(type, group);
      });
  }

  create(item) {
    this.send("create", item);
  }

  update(item) {
    this.send("save", item);
  }

}

export default new GroupStore();