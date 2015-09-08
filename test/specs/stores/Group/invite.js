
import _ from "lodash";
import { expect } from "chai";
import sinon from "sinon";

import { GroupStore } from "../../../../src/stores";
import { GroupAPI } from "../../../../src/api";
import { GroupActions } from "../../../../src/actions";

describe('INVITE', function(){
  let server;

  before(function () {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
  });

  after(function () {
    server.restore();
    GroupStore.clear();
  });

  it("must call GroupAPI, send an invitation, receive it and update the store", function(done){
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

    let resMember = [
      { id: "3", state: 'pending', role: 'member' },
      { id: "4", state: 'pending', role: 'member' }
    ];

    server.respondWith("POST", pURL + gid + "/members", [
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
      expect(group.members.length).to.be.equal(4);

      theMembers.forEach( (m, i) => {
        expect(group.members[i].id).to.be.equal(m.id);
        expect(group.members[i].state).to.be.equal(m.state);
        expect(group.members[i].role).to.be.equal(m.role);
      });

      resMember.forEach( (m, i) => {
        expect(group.members[i+2].id).to.be.equal(m.id);
        expect(group.members[i+2].state).to.be.equal(m.state);
        expect(group.members[i+2].role).to.be.equal(m.role);
      });

      event.remove();
      done();

    });

    GroupActions.invite(gid, { users: [ "123", "124" ] });
  });

});
