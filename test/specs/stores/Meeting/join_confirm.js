
import _ from "lodash";
import { expect } from "chai";
import sinon from "sinon";

import { MeetingStore } from "../../../../src/stores";
import { MeetingAPI } from "../../../../src/api";
import { MeetingActions } from "../../../../src/actions";

describe('JOIN & CONFIRM', function(){
  let server;

  before(function () {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
  });

  after(function () {
    server.restore();
    MeetingStore.clear();
  });

  it("must call MeetingAPI, join as atteendee, receive it and update the store", function(done){
    let pURL = MeetingAPI.uri, mid = "3456";

    let theMeeting = {
      id: mid,
      "title": "new group title"
    };

    let theAtteendees = [{
      id: "1",
      user: 'pepe'
    }, {
      id: "2",
      user: 'pepe2'
    }];

    // fire a recieve first to fill the store
    MeetingActions.receive(theMeeting);
    MeetingActions.receiveAttendees(mid, theAtteendees);

    let resAttendees = [
      { id: "3", user: 'pepe3' }
    ];

    let resAttendees2 = [
      { id: "3", user: 'pepe3', confirmed: true }
    ];

    server.respondWith("POST", pURL + mid + "/attendees/me", [
      200, { "Content-Type": "application/json" },
      JSON.stringify(resAttendees)
    ]);

    server.respondWith("POST", pURL + mid + "/confirmed/me", [
      200, { "Content-Type": "application/json" },
      JSON.stringify(resAttendees2)
    ]);

    let preMeetings = MeetingStore.getState();
    expect(preMeetings.length).to.be.equal(1);
    expect(preMeetings[0].attendees).to.be.an("array");
    expect(preMeetings[0].attendees.length).to.be.equal(2);

    let calls = 0;
    let event = MeetingStore.addListener(() => {
      calls++;

      let meetings = MeetingStore.getState();
      expect(meetings).to.be.an("array");
      expect(meetings.length).to.be.equal(1);

      let meeting = meetings[0];
      expect(meeting.attendees.length).to.be.equal(3);

      theAtteendees.forEach( (m, i) => {
        expect(meeting.attendees[i].id).to.be.equal(m.id);
        expect(meeting.attendees[i].user).to.be.equal(m.user);
      });

      switch(calls){
        case 1:
          resAttendees.forEach( (m, i) => {
            expect(meeting.attendees[i+2].id).to.be.equal(m.id);
            expect(meeting.attendees[i+2].user).to.be.equal(m.user);
          });
          break;
        case 2:
          resAttendees2.forEach( (m, i) => {
            expect(meeting.attendees[i+2].id).to.be.equal(m.id);
            expect(meeting.attendees[i+2].user).to.be.equal(m.user);
          });

          event.remove();
          done();

          break;
      }

    });

    MeetingActions.join(mid);
    MeetingActions.confirm(mid);
  });

});
