
import ListStore from "./ListStore";
import request from "superagent";

import MeetingConstants from "../constants/Meeting";

class MeetingStore extends ListStore {

  constructor() {
    super();

    this.uri = "";
    this.type = "MEETING";

    this.events = [
      "error"
    ];

    ["find", "create", "save", "destroy", "join", "leave", "confirm"]
      .forEach( event => {
        this.events.push("before:" + event);
        this.events.push(event);
      });
  }

  getURI(gid){
    if (gid){
      return "/api/groups/${gid}/meetings/".replace("${gid}", gid);
    }
    return "/api/meetings/";
  }

  dispatchCallback(payload) {
    if (payload.type.split("_")[0] !== this.type){
      return;
    }

    //if (!payload.gid){
    //  throw new Error("Expected GroupId on Meeting payload");
    //}

    switch (payload.type) {
      case MeetingConstants.FIND:
        this.find(payload.gid);
        break;
      case MeetingConstants.FINDONE:
        this.findOne(payload.id);
        break;
      case MeetingConstants.CREATE:
        this.create(payload.gid, payload.data);
        break;
      case MeetingConstants.UPDATE:
        this.save(payload.gid, payload.data);
        break;
      case MeetingConstants.DESTROY:
        this.destroy(payload.gid, payload.id);
        break;
      case MeetingConstants.JOIN:
        this.join(payload.id);
        break;
      case MeetingConstants.LEAVE:
        this.leave(payload.id);
        break;
      case MeetingConstants.CONFIRM:
        this.confirm(payload.id);
        break;
    };

  }

  getGroup(gid, nocreate){
    if (!nocreate && !this.list.has(gid)){
      this.list.set(gid, new Map());
    }

    return this.list.get(gid);
  }

  getMeeting(id){
    var _meeting;
    this.list.forEach( meetings => {
      meetings.forEach( meeting => {
        if (meeting.id === id){
          _meeting = meeting;
        }
      });
    });

    return _meeting;
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

  findOne(mid) {
/*
    if (this.list.has(gid)){
      this.emit("find", this.get(gid));
      return;
    }
*/
    this.emit("before:find");

    request
      .get(this.getURI() + mid)
      .end( (err, res) => {
        if (this.errorHandler(err, "find")){
          return;
        }

        //this.add(gid, res.body);
        this.emit("find", res.body);
      });
  }

  create(gid, meeting){
    this.emit("before:create");

    request
      .post(this.getURI(gid))
      .send(meeting)
      .end( (err, res) => {
        if (this.errorHandler(err, "create")){
          return;
        }

        this.add(gid, res.body);
        this.emit("create", this.get(gid));
      });
  }

  save(gid, meeting){
    this.emit("before:save");

    request
      .put(this.getURI(gid) + meeting.id)
      .send(meeting)
      .end( (err, res) => {
        if (this.errorHandler(err, "save")){
          return;
        }

        var meetings = this.getGroup(gid);
        meetings.set(meeting.id, res.body);
        this.emit("save", this.get(gid));
      });
  }

  destroy(gid, id){
    this.emit("before:destroy");

    request
      .del(this.getURI(gid) + id)
      .end( (err, res) => {
        if (this.errorHandler(err, "destroy")){
          return;
        }

        var meetings = this.getGroup(gid);
        meetings.delete(id);
        this.emit("destroy", this.get(gid));
      });
  }

  join(id){
    this.emit("before:join");

    request
      .post(this.getURI() + id + "/attendees/me")
      .end( (err, res) => {
        if (this.errorHandler(err, "join")){
          return;
        }

        var attendee = res.body;
        //attendee.user = window.user;
        //var meeting = this.getMeeting(id);
        //meeting.attendees.push(id);
        //this.emit("join", meeting);
        this.emit("join", attendee);
      });
  }

  leave(id){
    this.emit("before:leave");

    request
      .del(this.getURI() + id + "/attendees/me")
      .end( (err, res) => {
        if (this.errorHandler(err, "leave")){
          return;
        }

        //var meeting = this.get(gid, id);
        //var idx = meeting.attendees.indexOf(id);
        //meeting.attendees.splice(idx, 1);
        this.emit("leave");
      });
  }

  confirm(id){
    this.emit("before:confirm");

    request
      .post(this.getURI() + id + "/confirmed/me")
      .end( (err, res) => {
        if (this.errorHandler(err, "confirm")){
          return;
        }

        var attendee = res.body;
        //attendee.user = window.user;

        //var meeting = this.get(gid, id);
        //var idx = meeting.assistants.indexOf(id);
        //meeting.assistants.splice(idx, 1);
        //meeting.confirmed.push(id);
        this.emit("confirm", attendee);
      });
  }

}

export default new MeetingStore();
