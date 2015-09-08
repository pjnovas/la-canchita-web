
import _ from "lodash";
import { expect } from "chai";
import sinon from "sinon";

import { MeetingStore } from "../../../../src/stores";
import { MeetingAPI } from "../../../../src/api";
import { MeetingActions } from "../../../../src/actions";

describe('FINDONE', function(){
  let server, mid = "12345";

  before(function () {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
  });

  after(function () {
    server.restore();
    MeetingStore.clear();
  });

  it("must call MeetingAPI, fire and change event on Store for each server call", function(done){
    let mURL = MeetingAPI.uri + mid;

    server.respondWith("GET", mURL, [
      200, { "Content-Type": "application/json" },
      JSON.stringify({
        "id": mid,
        "title": "title server " + mid,
        "attendees": [{
          id: "440",
          "user": {
            id: "123",
            "name": "pepe"
          }
        },{
          id: "441",
          "user": {
            id: "124",
            "name": "pepe2"
          }
        }]
      })
    ]);

    let event = MeetingStore.addListener(() => {

      let meetings = MeetingStore.getState();
      expect(meetings).to.be.an("array");
      expect(meetings.length).to.be.equal(1);

      let meeting = meetings[0];

      expect(meeting.id).to.be.equal(mid);
      expect(meeting.title).to.be.equal("title server " + mid);

      expect(meeting.attendees).to.be.an("array");
      expect(meeting.attendees.length).to.be.equal(2);
      expect(meeting.attendees[0].user.id).to.be.ok;
      expect(meeting.attendees[0].user.name).to.be.ok;

      event.remove();
      done();
    });

    MeetingActions.findOne(mid);
  });

  it("must merge attendees if a new one come into the store", function(done){
    expect(MeetingStore.getState().length).to.be.equal(1);

    let event = MeetingStore.addListener(() => {
      let meetings = MeetingStore.getState();

      expect(meetings).to.be.an("array");
      expect(meetings.length).to.be.equal(1);

      let meeting = meetings[0];

      expect(meeting.id).to.be.equal(mid);
      expect(meeting.title).to.be.equal("title server " + mid);

      expect(meeting.attendees).to.be.an("array");
      expect(meeting.attendees.length).to.be.equal(3);

      event.remove();
      done();
    });

    MeetingActions.receiveAttendees(mid, {
      meeting: mid,
      id: "445",
      user: {
        id: "127",
        "name": "pepe8"
      }
    });

  });

  it("must remove attendees if is called", function(done){
    expect(MeetingStore.getState().length).to.be.equal(1);

    let event = MeetingStore.addListener(() => {
      let meetings = MeetingStore.getState();

      expect(meetings).to.be.an("array");
      expect(meetings.length).to.be.equal(1);

      let meeting = meetings[0];

      expect(meeting.id).to.be.equal(mid);
      expect(meeting.title).to.be.equal("title server " + mid);

      expect(meeting.attendees).to.be.an("array");
      expect(meeting.attendees.length).to.be.equal(2);

      event.remove();
      done();
    });

    MeetingActions.removeAttendee(mid, "445");

  });

});
