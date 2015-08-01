
import MeetingStore from "../../stores/Meeting";
import MeetingActions from "../../actions/Meeting";

import MeetingItem from "./Item.jsx";

import ReactListener from "../ReactListener";

import { Link } from "react-router";
import { List, FontIcon, FloatingActionButton } from "material-ui";

export default class MeetingList extends ReactListener {

  constructor(props) {
    super(props);

    this.state.gid = this.props.groupId;
    this.state.meetings = [];

    this.store = MeetingStore;
    this.editors = ["owner", "admin"];
  }

  componentDidMount() {
    super.componentDidMount();
    MeetingActions.find(this.state.gid);
  }

  onFind(meetings) {
    super.onFind();
    this.setState({ meetings });
  }

  render() {
    var list = this.state.meetings;

    var active = list;
    var past = list;

    var canCreate = true; //this.editors.indexOf(myRole) > -1;

    return (
      <div>

        <List>
        {active.map(meeting => {
          return <MeetingItem key={meeting.id} model={meeting}/>;
        })}
        </List>

        { past.length ?
        <List subheader={__.meeting_past}>
          {past.map(meeting => {
            return <MeetingItem key={meeting.id} model={meeting} />;
          })}
        </List>
        : null }

        { this.props.isVisible && canCreate ?
        <FloatingActionButton primary={true} tooltip={__.group_create}
          containerElement={<Link to="meetingnew" params={{groupId: this.state.gid}} />}
          linkButton={true} style={Theme.css.actionButton} >
          <FontIcon className="material-icons">add</FontIcon>
        </FloatingActionButton>
        : null }

      </div>
    );
  }

};

MeetingList.displayName = "MeetingList";
