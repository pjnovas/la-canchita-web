
import _ from "lodash";
import { expect } from "chai";
import sinon from "sinon";

import { UserStore } from "../../../src/stores";
import { UserAPI } from "../../../src/api";
import { UserActions } from "../../../src/actions";

describe("UserStore", function(){

  describe('SEARCH', function(){
    let server;

    before(() => { server = sinon.fakeServer.create(); });
    after(() => { server.restore(); });

    it("must call UserAPI, fire a RECIEVE action an a change event on Store", function(done){

      expect(UserAPI.uri).to.be.equal("/api/users/");

      server.respondWith("GET", UserAPI.uri + 'search?q=somequery', [
        200, { "Content-Type": "application/json" },
        JSON.stringify([
          { "id": 10, "name": "user name 1" },
          { "id": 11, "name": "user name 2" }
        ])
      ]);

      let event = UserStore.addListener(() => {

        let users = UserStore.getState();
        expect(users).to.be.an("array");
        expect(users.length).to.be.equal(2);

        expect(users[0].id).to.be.equal(10);
        expect(users[0].name).to.be.equal("user name 1");

        expect(users[1].id).to.be.equal(11);
        expect(users[1].name).to.be.equal("user name 2");

        event.remove();
        UserStore.clear();

        done();
      });

      UserActions.search('somequery');
      server.respond();
    });

  });

  describe('RECIEVE', function(){

    after(() => { UserStore.clear(); });

    it("must add users and fire change event", function(done){

      let event = UserStore.addListener(() => {

        let users = UserStore.getState();
        expect(users).to.be.an("array");
        expect(users.length).to.be.equal(2);

        event.remove();
        done();
      });

      UserActions.receive([{
        id: "1",
        name: "user name 1"
      },{
        id: "2",
        name: "user name 2"
      }]);

    });

  });


});
