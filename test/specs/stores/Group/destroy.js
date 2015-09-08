
import _ from "lodash";
import { expect } from "chai";
import sinon from "sinon";

import { GroupStore } from "../../../../src/stores";
import { GroupAPI } from "../../../../src/api";
import { GroupActions } from "../../../../src/actions";

describe('DESTROY', function(){
  let server;

  before(function () {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
  });

  after(function () {
    server.restore();
    GroupStore.clear();
  });

  it("must call GroupAPI, by a DELETE method, firing a remove action and updating the store", function(done){
    let pURL = GroupAPI.uri, pid1 = "3456", pid2 = "3457";

    let groups = [{
      id: pid1,
      "title": "new group title",
    }, {
      id: pid2,
      "title": "new group title 2",
    }];

    // fire a recieve first to fill the store
    GroupActions.receive(groups);

    server.respondWith("DELETE", pURL + pid1, [
      204, { "Content-Type": "application/json" }, ""
    ]);

    expect(GroupStore.getState().length).to.be.equal(2);

    let event = GroupStore.addListener(() => {

      let groups = GroupStore.getState();
      expect(groups).to.be.an("array");
      expect(groups.length).to.be.equal(1);

      let group = groups[0];

      expect(group.id).to.be.equal(pid2);

      event.remove();
      done();
    });

    GroupActions.destroy(pid1);
  });

});
