
import _ from "lodash";
import { expect } from "chai";
import sinon from "sinon";

import { GroupStore } from "../../../../src/stores";
import { GroupAPI } from "../../../../src/api";
import { GroupActions } from "../../../../src/actions";

describe('REJECT', function(){
  let server;

  before(function () {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
  });

  after(function () {
    server.restore();
    GroupStore.clear();
  });

  it("must call GroupAPI, reject an invitation, receive it and update the store", function(done){
    let pURL = GroupAPI.uri, gid = "3456";

    let theGroup = {
      id: gid,
      "title": "new group title"
    };

    let theMembers = [{
      id: "1",
      state: 'active',
      role: 'owner'
    }, {
      id: "2",
      state: 'pending',
      role: 'member'
    }];

    // fire a recieve first to fill the store
    GroupActions.receive(theGroup);
    GroupActions.receiveMembers(gid, theMembers);

    let resMember = _.assign(theMembers[1], { state: 'rejected', role: 'member' });

    server.respondWith("DELETE", pURL + gid + "/members/me", [
      200, { "Content-Type": "application/json" },
      JSON.stringify(resMember)
    ]);

    let preGroups = GroupStore.getState();
    expect(preGroups.length).to.be.equal(1);
    expect(preGroups[0].members).to.be.an("array");
    expect(preGroups[0].members.length).to.be.equal(2);

    let event = GroupStore.addListener(() => {

      let groups = GroupStore.getState();
      expect(groups).to.be.an("array");
      expect(groups.length).to.be.equal(1);

      let group = groups[0];
      expect(group.members.length).to.be.equal(2);

      expect(group.members[0].id).to.be.equal(theMembers[0].id);
      expect(group.members[0].state).to.be.equal(theMembers[0].state);
      expect(group.members[0].role).to.be.equal(theMembers[0].role);

      expect(group.members[1].id).to.be.equal(resMember.id);
      expect(group.members[1].state).to.be.equal(resMember.state);
      expect(group.members[1].role).to.be.equal(resMember.role);

      event.remove();
      done();

    });

    GroupActions.reject(gid);
  });

});
