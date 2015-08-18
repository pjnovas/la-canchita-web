
import request from "superagent";
import GroupConstants from "../constants/GroupConstants";
import GroupActions from "../actions/GroupActions";

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
