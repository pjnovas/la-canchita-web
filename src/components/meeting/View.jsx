
import MeetingStore from "../../stores/Meeting";
import MeetingActions from "../../actions/Meeting";

import Header from "../Header.jsx";

import ReactListener from "../ReactListener";

export default class MeetingView extends ReactListener {

  constructor(props) {
    super(props);

    this.state.gid = "";
    this.state.id = this.props.params.meetingId;
    this.store = MeetingStore;

    this.editors = ["owner", "admin"];
    this.destroyers = ["owner"];
  }

  componentDidMount() {
    super.componentDidMount();
    MeetingActions.findOne(this.state.id);
  }

  onFind(meeting) {
    super.onFind();
    this.setState({ meeting, me: meeting.group.member, gid: meeting.group.id });
  }

  render() {

    return (
      <div>
        <Header backto="group" backparams={ { groupId: this.state.gid }} />
        Un PARTIDO!
      </div>
    );
  }

};

MeetingView.displayName = "MeetingView";
