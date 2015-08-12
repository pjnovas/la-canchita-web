
import MeetingStore from "../../stores/Meeting";
import MeetingActions from "../../actions/Meeting";

import Header from "../Header.jsx";
import ReactListener from "../ReactListener";

import { Grid, Row, Col, ListGroup } from "react-bootstrap";
import { ActionButton } from "../controls";

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
    let myRole = this.state.me && this.state.me.role || "member";
    let canEdit = this.editors.indexOf(myRole) > -1;
    let canDestroy = this.destroyers.indexOf(myRole) > -1;

    let meeting = this.state.meeting;

    if (!meeting){
      return (<span>{__.loading}</span>);
    }

    let when = moment(meeting.when);
    let time = when.from();
    let when_str = when.format(__.full_datetime_format);

    return (
      <div>
        <Header backto="group" backparams={ { groupId: this.state.gid } } />
        <Grid>

          <Row>
            <Col xs={10}>
              <h1>{meeting.title}</h1>
            </Col>
            <Col xs={2}>
              <p>{when_str}</p>
              <p>{time}</p>
            </Col>
          </Row>

          <Row className="collapser">
            <Col xs={6}>
              <p>{meeting.info}</p>
            </Col>
            <Col xs={6}>
              map
            </Col>
          </Row>

          { canEdit ?
            <ActionButton bsStyle="primary" icon="pencil"
              to="meetingedit" params={{meetingId: this.state.id}}/>
          : null }

        </Grid>
      </div>
    );
  }

};

MeetingView.displayName = "MeetingView";
