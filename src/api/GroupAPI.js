
import { GroupActions } from "../actions";
import IO from "./IO";

class GroupAPI extends IO {

  constructor(){
    this.uri = "/api/groups/";
    this.type = "GROUP";
    this.actions = GroupActions;
  }

  findOne(id) {
    this.get(id).then( group => {
      this.actions.receive(group);

      this.findMembers(id);
      this.findMeetings(id);
    });
  }

  findMembers(id){
    this.get(id + "/members").then( members => {
      GroupActions.receiveMembers(id, members);
    });
  }

  findMeetings(id){
    this.get(id + "/meetings").then( meetings => {
      GroupActions.receiveMeetings(id, meetings);
    });
  }

  create(group){
    this.post("", group).then( _group => {
      if (group.newpicture){
        return this.uploadPicture(_group, group.newpicture);
      }

      this.actions.receive(_group);
    });
  }

  update(id, group){
    this.put(id, group).then( _group => {
      if (group.newpicture){
        return this.uploadPicture(_group, group.newpicture);
      }

      this.actions.receive(_group);
    });
  }

  uploadPicture(group, image){
    this.post(group.id + "/picture", {
      attach: true,
      field: "image",
      file: image
    }).then( picture => {
      group.picture = picture;

      window.setTimeout(() => {
        this.actions.receive(group);
      }, 1000);
    });
  }

  accept(id){
    this.post(id + "/members/me").then( member => {
      setTimeout( () => this.find(), 100);
    });
  }

  reject(id){
    this.del(id + "/members/me").then( member => {
      setTimeout( () => this.find(), 100);
    });
  }

  leave(id){
    this.del(id + "/members/me").then( member => {
      // do nothing
    });
  }

  invite(id, data){
    this.post(id + "/members", data).then( members => {
      GroupActions.receiveMembers(id, members);
    });
  }

  setRole(id, member, role){
    this.put(id + "/members/" + member, { role: role }).then( member => {
      GroupActions.receiveMembers(id, member);
    });
  }

  kick(id, member){
    this.del(id + "/members/" + member).then( member => {
      // TODO: check removal of member
      GroupActions.receiveMembers(id, member);
    });
  }

  createMeeting(id, data){
    this.post(id + "/meetings", data).then( meeting => {
      GroupActions.receiveMeetings(id, meeting);
    });
  }

}

const instance = new GroupAPI();
export default instance;

export const API = GroupAPI;
