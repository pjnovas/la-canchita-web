
import MeetingStore from "../../stores/Meeting";
import MeetingActions from "../../actions/Meeting";

import Header from "../Header.jsx";

import ReactListener from "../ReactListener";
import {Button, ButtonAction, Tabs} from "../controls";

export default class MeetingView extends ReactListener {

  constructor(props) {
    super(props);

    this.state.id = this.props.params.groupId;
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
      <div className="groups view">
        <Header backto="groups" navs={navs} />

        Un PARTIDO!
      </div>
    );
  }

};

MeetingView.displayName = "MeetingView";
