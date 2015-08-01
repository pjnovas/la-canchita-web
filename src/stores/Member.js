
import ListStore from "./ListStore";
import request from "superagent";

import MemberConstants from "../constants/Member";

class MemberStore extends ListStore {

  constructor() {
    super();

    this.uri = "";
    this.type = "MEMBER";

    this.events = [
      "error"
    ];

    ["find", "accept", "decline", "invite", "setrole", "kick"]
      .forEach( event => {
        this.events.push("before:" + event);
        this.events.push(event);
      });
  }

  getURI(gid){
    return "/api/groups/${gid}/members/".replace("${gid}", gid);
  }

  dispatchCallback(payload) {
    if (payload.type.split("_")[0] !== this.type){
      return;
    }

    if (!payload.gid){
      throw new Error("Expected GroupId on Member payload");
    }

    switch (payload.type) {
      case MemberConstants.FIND:
        this.find(payload.gid);
        break;
      case MemberConstants.ACCEPT:
        this.accept(payload.gid);
        break;
      case MemberConstants.DECLINE:
        this.decline(payload.gid);
        break;
      case MemberConstants.INVITE:
        this.invite(payload.gid, payload.data);
        break;
      case MemberConstants.SETROLE:
        this.setRole(payload.gid, payload.data);
        break;
      case MemberConstants.KICK:
        this.kick(payload.gid, payload.id);
        break;
    };

  }

  getGroup(gid, nocreate){
    if (!nocreate && !this.list.has(gid)){
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
      this.emit("find", this.get(gid));
      return;
    }

    this.emit("before:find");

    request
      .get(this.getURI(gid))
      .end( (err, res) => {
        if (this.errorHandler(err, "find")){
          return;
        }

        this.add(gid, res.body);
        this.emit("find", this.get(gid));
      });
  }

  invite(gid, invites){
    this.emit("before:invite");

    request
      .post(this.getURI(gid))
      .send(invites)
      .end( (err, res) => {
        if (this.errorHandler(err, "invite")){
          return;
        }

        this.add(gid, res.body);
        this.emit("invite", this.get(gid));
      });
  }

  accept(gid){
    this.emit("before:accept");

    request
      .post(this.getURI(gid) + "me")
      .end( (err, res) => {
        if (this.errorHandler(err, "accept")){
          return;
        }

        if (this.getGroup(gid, true)){
          // members of group wasn"t fetched so don"t add unless its there
          // if it"s not there will fetch on enter the group view
          this.add(gid, res.body);
          this.emit("accept", this.get(gid));
        }

        this.emit("accept");
      });
  }

  decline(gid){
    this.emit("before:decline");

    request
      .del(this.getURI(gid) + "me")
      .end( (err, res) => {
        if (this.errorHandler(err, "decline")){
          return;
        }

        //this.remove(gid);
        this.emit("decline", this.get(gid));
      });
  }

  setRole(gid, data){
    this.emit("before:setrole");

    request
      .put(this.getURI(gid) + data.id)
      .send({ role: data.role })
      .end( (err, res) => {
        if (this.errorHandler(err, "setrole")){
          return;
        }

        var members = this.getGroup(gid);
        members.get(data.id).role = data.role;
        this.emit("setrole", this.get(gid));
      });
  }

  kick(gid, id){
    this.emit("before:kick");

    request
      .del(this.getURI(gid) + id)
      .end( (err, res) => {
        if (this.errorHandler(err, "kick")){
          return;
        }

        var members = this.getGroup(gid);
        members.delete(id);
        this.emit("kick", this.get(gid));
      });
  }

}

export default new MemberStore();
