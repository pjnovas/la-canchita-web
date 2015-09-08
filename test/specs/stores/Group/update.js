
import _ from "lodash";
import { expect } from "chai";
import sinon from "sinon";

import { GroupStore } from "../../../../src/stores";
import { GroupAPI } from "../../../../src/api";
import { GroupActions } from "../../../../src/actions";

describe('UPDATE', function(){
  let server;

  before(function () {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
  });

  after(function () {
    server.restore();
    GroupStore.clear();
  });

  it("must call GroupAPI, updating a Group, receiving it and updating the store", function(done){
    let pURL = GroupAPI.uri, gid = "3456";

    let theGroup = {
      id: gid,
      "title": "some group title",
      "description": "some desc"
    };

    // fire a recieve first to fill the store
    GroupActions.receive(theGroup);

    let updGroup = {
      title: "updated group title",
      "description": "some desc"
    };

    let resGroup = _.assign(theGroup, updGroup);

    server.respondWith("PUT", pURL + gid, [
      200, { "Content-Type": "application/json" },
      JSON.stringify(resGroup)
    ]);

    expect(GroupStore.getState().length).to.be.equal(1);

    let event = GroupStore.addListener(() => {

      let groups = GroupStore.getState();
      expect(groups).to.be.an("array");
      expect(groups.length).to.be.equal(1);

      let group = groups[0];

      expect(group.id).to.be.equal(resGroup.id);
      expect(group.title).to.be.equal(resGroup.title);
      expect(group.description).to.be.equal(resGroup.description);

      event.remove();
      done();

    });

    GroupActions.update(gid, updGroup);
  });

});
