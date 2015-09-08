
import _ from "lodash";
import { expect } from "chai";
import sinon from "sinon";

import { GroupStore, MeetingStore } from "../../../../src/stores";
import { MeetingAPI } from "../../../../src/api";
import { GroupActions, MeetingActions } from "../../../../src/actions";

describe('REMOVE', function(){
  let server, gid = "12345";

  after(function () {
    GroupStore.clear();
    MeetingStore.clear();
  });

  it("must call MeetingStore and GroupStore updating their states", function(done){
    let gid = "12345", mid = "5";

    let theGroup = {
      id: gid,
      "title": "new group title"
    };

    let theMeetings = [{
      id: "1",
      group: { id: gid },
      title: "meeting title 1"
    }, {
      id: mid,
      group: { id: gid },
      title: "meeting title 2"
    }];

    // fire a recieve first to fill the stores
    GroupActions.receive(theGroup);
    GroupActions.receiveMeetings(gid, theMeetings);
    MeetingActions.receive(theMeetings);

    // check states are correct
    let groups = GroupStore.getState();
    expect(groups.length).to.be.equal(1);
    expect(groups[0].meetings.length).to.be.equal(2); // 2 meetings in the group

    let meetings = MeetingStore.getState();
    expect(meetings.length).to.be.equal(2); // 2 meetings in the store

    let calledGroups = false;
    let calledMeetings = false;

    let eventG = GroupStore.addListener(() => {
      calledGroups = true;

      let groups = GroupStore.getState();
      expect(groups.length).to.be.equal(1);

      let group = groups[0];
      expect(group.meetings.length).to.be.equal(1); // 1 meeting in the group

      eventG.remove();

      if (calledMeetings){
        done();
      }
    });

    let eventM = MeetingStore.addListener(() => {
      calledMeetings = true;

      let meetings = MeetingStore.getState();
      expect(meetings.length).to.be.equal(1); // 1 meetings in the store

      eventM.remove();

      if (calledGroups){
        done();
      }
    });

    MeetingActions.remove(mid);
  });

});
