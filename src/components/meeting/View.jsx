
import MeetingStore from "../../stores/Meeting";
import MeetingActions from "../../actions/Meeting";

import Header from "../Header.jsx";

import ReactListener from "../ReactListener";

export default class MeetingView extends ReactListener {

  constructor(props) {
    super(props);

    this.state.gid = this.props.params.groupId;
    this.store = MeetingStore;

    this.editors = ["owner", "admin"];
    this.destroyers = ["owner"];
  }

  componentDidMount() {
    super.componentDidMount();
    MeetingActions.findOne(this.state.id);
  }

  onFind(group) {
    super.onFind();
    this.setState({ group, me: group.member });
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
