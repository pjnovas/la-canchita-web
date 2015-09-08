
import _ from "lodash";
import { expect } from "chai";
import sinon from "sinon";

import { MeetingStore } from "../../../../src/stores";
import { MeetingAPI } from "../../../../src/api";
import { MeetingActions } from "../../../../src/actions";

describe('LEAVE', function(){
  let server;

  before(function () {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
  });

  after(function () {
    server.restore();
    MeetingStore.clear();
  });

  it("must call MeetingAPI, leave as attendee, receive it and update the store", function(done){
    let pURL = MeetingAPI.uri, mid = "3456";

    let theMeeting = {
      id: mid,
      "title": "new group title"
    };

    // set a user as logged in to test removal;
    window.user = { id: "666" };

    let theAtteendees = [{
      id: "1",
      user: {
        id: "1234",
        name: "pepe"
      }
    }, {
      id: "2",
      user: {
        id: window.user.id,
        name: "pepe2"
      }
    }];

    // fire a recieve first to fill the store
    MeetingActions.receive(theMeeting);
    MeetingActions.receiveAttendees(mid, theAtteendees);

    server.respondWith("DELETE", pURL + mid + "/attendees/me", [
      204, { "Content-Type": "application/json" }, ""
    ]);

    let preMeetings = MeetingStore.getState();
    expect(preMeetings.length).to.be.equal(1);
    expect(preMeetings[0].attendees).to.be.an("array");
    expect(preMeetings[0].attendees.length).to.be.equal(2);

    let event = MeetingStore.addListener(() => {

      let meetings = MeetingStore.getState();
      expect(meetings).to.be.an("array");
      expect(meetings.length).to.be.equal(1);

      let meeting = meetings[0];
      expect(meeting.attendees.length).to.be.equal(1);

      event.remove();
      done();

    });

    MeetingActions.leave(mid);
  });

});
