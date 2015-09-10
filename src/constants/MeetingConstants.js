import builder from "./builder";
export default builder("MEETING", [
  "RECEIVE_ATTENDEES",
  "REMOVE_ATTENDEE",
  "REMOVE_ATTENDEE_ME",
  "JOIN",
  "LEAVE",
  "CONFIRM",
  "JOIN_ROOM",
  "LEAVE_ROOM"
], true);
