
import _ from "lodash";
import { expect } from "chai";
import sinon from "sinon";

import { GroupStore } from "../../../../src/stores";
import { GroupAPI } from "../../../../src/api";
import { GroupActions } from "../../../../src/actions";

describe('FIND', function(){
  let server;

  before(() => { server = sinon.fakeServer.create(); });
  after(() => { server.restore(); });

  it("must call GroupAPI, fire a RECIEVE action an a change event on Store", function(done){

    expect(GroupAPI.uri).to.be.equal("/api/groups/");

    server.respondWith("GET", GroupAPI.uri, [
      200, { "Content-Type": "application/json" },
      JSON.stringify([
        { "id": 10, "title": "title server 1" },
        { "id": 11, "title": "title server 2" }
      ])
    ]);

    let event = GroupStore.addListener(() => {

      let groups = GroupStore.getState();
      expect(groups).to.be.an("array");
      expect(groups.length).to.be.equal(2);

      expect(groups[0].id).to.be.equal(10);
      expect(groups[0].title).to.be.equal("title server 1");

      expect(groups[1].id).to.be.equal(11);
      expect(groups[1].title).to.be.equal("title server 2");

      event.remove();
      GroupStore.clear();

      done();
    });

    GroupActions.find();
    server.respond();
  });

});
