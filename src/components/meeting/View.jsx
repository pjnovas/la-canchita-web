
import MeetingStore from "../../stores/Meeting";
import MeetingActions from "../../actions/Meeting";

import Header from "../Header.jsx";
import Attendees from "./Attendees.jsx";
import ReactListener from "../ReactListener";

import { Grid, Row, Col, ListGroup } from "react-bootstrap";
import { ActionButton } from "../controls";

export default class MeetingView extends ReactListener {

  constructor(props) {
    super(props);

    this.state.gid = "";
    this.state.id = this.props.params.meetingId;
    this.store = MeetingStore;
  }

  componentDidMount() {
    super.componentDidMount();
    MeetingActions.findOne(this.state.id);
  }

  onFind(meeting) {
    super.onFind();
    this.setState({ meeting, gid: meeting.group.id });
  }

  onJoin(attendee){
    let meeting = this.state.meeting;
    meeting.attendees.push(attendee);
    this.setState({ meeting });
  }

  onLeave(attendee){
    let meeting = this.state.meeting;

    let idx = -1;
    meeting.attendees.forEach( (attendee, i) => {
      if (window.user.id === attendee.user.id){
        idx = i;
      }
    });

    if (idx > -1){
      meeting.attendees.splice(idx, 1);
      this.setState({ meeting });
    }
  }

  getStage(){
    let now = moment();
    let meeting = this.state.meeting;
    let when = moment(meeting.when);
    let duration = meeting.duration || { times: 1, period: 'hours' };
    let end = when.clone().add(duration.times, duration.period);
    let historic = end.clone().add(1, 'week');

    let stage = 'joining';

    if (meeting.confirmation && now > meeting.confirmStart && now < meeting.confirmEnd){
      stage = 'confirming';
    }
    else if (now > when && now < end) {
      stage = 'running';
    }
    else if (now > end) {
      stage = 'historic';

      if (now < historic){
        stage = 'played';
      }
    }

    return stage;
  }

  render() {
    let meeting = this.state.meeting;

    if (!meeting){
      return (<span>{__.loading}</span>);
    }

    let when = moment(meeting.when);
    let time = when.from();
    let when_str = when.format(__.full_datetime_format);

    let stage = this.getStage();

    return (
      <div>
        <Header backto="grouptab" backparams={ { groupId: this.state.gid, tab: "meetings" } } />
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

          <Row>
            <Col xs={12}>
              <Attendees meeting={meeting} stage={stage} />
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }

};

MeetingView.displayName = "MeetingView";
