
import _ from "lodash";
import { expect } from "chai";
import sinon from "sinon";

import { GroupStore } from "../../../../src/stores";
import { GroupAPI } from "../../../../src/api";
import { GroupActions } from "../../../../src/actions";

describe('CREATE_MEETING', function(){
  let server, gid = "12345";

  before(function () {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
  });

  after(function () {
    server.restore();
    GroupStore.clear();
  });

  it("must call GroupAPI, fire and change event on Store with the new Meeting", function(done){
    let gURL = GroupAPI.uri + gid;
    let meetingsURL = gURL + "/meetings";

    let theGroup = {
      id: gid,
      "title": "new group title"
    };

    let theMeetings = [{
      id: "1",
      title: "meeting title 1"
    }, {
      id: "2",
      title: "meeting title 2"
    }];

    // fire a recieve first to fill the store
    GroupActions.receive(theGroup);
    GroupActions.receiveMeetings(gid, theMeetings);

    server.respondWith("POST", meetingsURL, [
      200, { "Content-Type": "application/json" },
      JSON.stringify({
        group: gid,
        id: "3",
        title: "meeting 3"
      })
    ]);

    let calls = 0;
    let event = GroupStore.addListener(() => {
      calls++;

      let groups = GroupStore.getState();
      expect(groups).to.be.an("array");
      expect(groups.length).to.be.equal(1);

      let group = groups[0];

      expect(group.meetings).to.be.an("array");
      expect(group.meetings.length).to.be.equal(3);

      event.remove();
      done();
    });

    GroupActions.createMeeting(gid, {
      title: "meeting 1"
    });

  });

});
