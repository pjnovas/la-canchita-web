
import _ from "lodash";
import { expect } from "chai";
import sinon from "sinon";

import { GroupStore } from "../../../../src/stores";
import { GroupAPI } from "../../../../src/api";
import { GroupActions } from "../../../../src/actions";

describe('FINDONE', function(){
  let server, gid = "12345";

  before(function () {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
  });

  after(function () {
    server.restore();
    GroupStore.clear();
  });

  it("must call GroupAPI, fire and change event on Store for each server call", function(done){
    let gURL = GroupAPI.uri + gid;
    let membersURL = gURL + "/members";
    let meetingsURL = gURL + "/meetings";

    server.respondWith("GET", gURL, [
      200, { "Content-Type": "application/json" },
      JSON.stringify({
        "id": gid,
        "title": "title server " + gid,
        "member": {
          "role": "owner",
          "state": "active",
          "user": {
            id: "123",
            "name": "pepe",
            "picture": "http://pic.com/pic.png"
          }
        }
      })
    ]);

    server.respondWith("GET", membersURL, [
      200, { "Content-Type": "application/json" },
      JSON.stringify([{
        group: gid,
        id: "345",
        role: "owner"
      },{
        group: gid,
        id: "346",
        role: "member"
      }])
    ]);

    server.respondWith("GET", meetingsURL, [
      200, { "Content-Type": "application/json" },
      JSON.stringify([{
        group: gid,
        id: "445",
        title: "meeting 1"
      },{
        group: gid,
        id: "446",
        title: "meeting 2"
      }])
    ]);

    let calls = 0;
    let event = GroupStore.addListener(() => {
      calls++;

      let groups = GroupStore.getState();
      expect(groups).to.be.an("array");
      expect(groups.length).to.be.equal(1);

      let group = groups[0];

      expect(group.id).to.be.equal(gid);
      expect(group.title).to.be.equal("title server " + gid);
      expect(group.member.role).to.be.equal("owner");
      expect(group.member.state).to.be.equal("active");
      expect(group.member.user.id).to.be.ok;
      expect(group.member.user.name).to.be.ok;
      expect(group.member.user.picture).to.be.ok;

      switch (calls) {
        case 1:
          expect(group.members).to.not.be.ok;
          expect(group.meetings).to.not.be.ok;
          break;
        case 2:
          expect(group.meetings).to.not.be.ok;

          expect(group.members).to.be.an("array");
          expect(group.members.length).to.be.equal(2);
          break;
        case 3:
          expect(group.members).to.be.an("array");
          expect(group.members.length).to.be.equal(2);

          expect(group.meetings).to.be.an("array");
          expect(group.meetings.length).to.be.equal(2);

          event.remove();
          done();

          break;
      }
    });

    GroupActions.findOne(gid);
  });

  it("must merge members if a new one come into the store", function(done){
    expect(GroupStore.getState().length).to.be.equal(1);

    let event = GroupStore.addListener(() => {
      let groups = GroupStore.getState();

      expect(groups).to.be.an("array");
      expect(groups.length).to.be.equal(1);

      let group = groups[0];

      expect(group.id).to.be.equal(gid);
      expect(group.title).to.be.equal("title server " + gid);
      expect(group.member).to.be.an("object");

      expect(group.members).to.be.an("array");
      expect(group.members.length).to.be.equal(3);

      expect(group.meetings).to.be.an("array");
      expect(group.meetings.length).to.be.equal(2);

      event.remove();
      done();
    });

    GroupActions.receiveMembers(gid, {
      group: gid,
      id: "446",
      title: "meeting 2"
    });

  });

  it("must merge meetings if a new one come into the store", function(done){
    expect(GroupStore.getState().length).to.be.equal(1);

    let event = GroupStore.addListener(() => {
      let groups = GroupStore.getState();

      expect(groups).to.be.an("array");
      expect(groups.length).to.be.equal(1);

      let group = groups[0];

      expect(group.id).to.be.equal(gid);
      expect(group.title).to.be.equal("title server " + gid);
      expect(group.member).to.be.an("object");

      expect(group.members).to.be.an("array");
      expect(group.members.length).to.be.equal(3);

      expect(group.meetings).to.be.an("array");
      expect(group.meetings.length).to.be.equal(3);

      event.remove();
      done();
    });

    GroupActions.receiveMeetings(gid, {
      group: gid,
      id: "447",
      title: "meeting 3"
    });

  });

});
