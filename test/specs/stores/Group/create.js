
import _ from "lodash";
import { expect } from "chai";
import sinon from "sinon";

import { GroupStore } from "../../../../src/stores";
import { GroupAPI } from "../../../../src/api";
import { GroupActions } from "../../../../src/actions";

describe('CREATE', function(){
  let server;

  before(function () {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
  });

  after(function () {
    server.restore();
    GroupStore.clear();
  });

  it("must call GroupAPI, creating a Group, receiving it and updating the store", function(done){
    let pURL = GroupAPI.uri;

    let newGroup = {
      "title": "new group title"
    };

    let resGroup = _.assign({
      id: "2345",
      title: "new group title"
    }, newGroup);

    server.respondWith("POST", pURL, [
      200, { "Content-Type": "application/json" },
      JSON.stringify(resGroup)
    ]);

    expect(GroupStore.getState().length).to.be.equal(0);

    let calls = 0;
    let event = GroupStore.addListener(() => {
      calls++;

      let groups = GroupStore.getState();
      expect(groups).to.be.an("array");
      expect(groups.length).to.be.equal(1);

      let group = groups[0];

      expect(group.id).to.be.equal(resGroup.id);
      expect(group.token).to.be.equal(resGroup.token);
      expect(group.title).to.be.equal(resGroup.title);
      expect(group.dashboard).to.be.equal(resGroup.dashboard);

      event.remove();
      done();

    });

    GroupActions.create(newGroup);
  });

});
