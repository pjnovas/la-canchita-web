
import ListStore from "./ListStore";
import request from "superagent";

import UserConstants from "../constants/User";

class UserStore extends ListStore {

  constructor() {
    super();

    this.uri = "/api/users/";
    this.type = "USER";

    this.events = [
      "error"
    ];

    ["search", "findme", "updateme"]
      .forEach( event => {
        this.events.push("before:" + event);
        this.events.push(event);
      });
  }

  dispatchCallback(payload) {

    switch (payload.type) {
      case UserConstants.SEARCH:
        this.search(payload.query);
        break;
      case UserConstants.FINDME:
        this.findMe();
        break;
      case UserConstants.UPDATEME:
        this.updateMe(payload.data);
        break;
    };

  }

  search(query) {
    this.emit("before:search");

    request
      .get(this.uri + "search?q=" + query)
      .end( (err, res) => {
        if (this.errorHandler(err, "search")){
          return;
        }

        this.emit("search", res.body);
      });
  }

  findMe() {
    this.emit("before:findme");

    request
      .get(this.uri + "me")
      .end( (err, res) => {
        if (this.errorHandler(err, "findme")){
          return;
        }

        this.emit("findme", res.body);
      });
  }

  updateMe(data) {
    this.emit("before:updateme");

    request
      .put(this.uri + "me")
      .send(data)
      .end( (err, res) => {
        if (this.errorHandler(err, "updateme")){
          return;
        }

        this.emit("updateme", res.body);
      });
  }

}

export default new UserStore();