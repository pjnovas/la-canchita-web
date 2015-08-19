
import request from "superagent";
import { GroupActions } from "../actions";

class GroupAPI {

  constructor(){
    this.uri = "/api/groups/";
    this.type = "GROUP";
  }

  find() {

    request
      .get(this.uri)
      .end( (err, res) => {
        if (this.errorHandler(err, "find")){
          return;
        }

        GroupActions.receive(res.body);
      });
  }

  findOne(id) {

    request
      .get(this.uri + id)
      .end( (err, res) => {
        if (this.errorHandler(err, "findOne")){
          return;
        }

        GroupActions.receive(res.body);
        this.findMembers(id);
        this.findMeetings(id);
      });
  }

  findMembers(id){

    request
      .get(this.uri + id + "/members")
      .end( (err, res) => {
        if (this.errorHandler(err, "findMembers")){
          return;
        }

        GroupActions.receiveMembers(id, res.body);
      });
  }

  findMeetings(id){

    request
      .get(this.uri + id + "/meetings")
      .end( (err, res) => {
        if (this.errorHandler(err, "findMeetings")){
          return;
        }

        GroupActions.receiveMeetings(id, res.body);
      });
  }

  errorHandler(err, type){

    if (err) {

      /* trigger error action
      this.emit("error", {
        store: this.type,
        type,
        status: err.status,
        response: err.response,
        body: err.response.body,
        text: err.response.text,
      });
      */

      return true;
    }
  }

}

const instance = new GroupAPI();
export default instance;

export const API = GroupAPI;
