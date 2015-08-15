
import MeetingStore from "../../stores/Meeting";
import MeetingActions from "../../actions/Meeting";

import Header from "../Header.jsx";
import Attendees from "./Attendees.jsx";
import ReactListener from "../ReactListener";

import { Grid, Row, Col, Button, Collapse } from "react-bootstrap";
import { ActionButton, GMap, Icon } from "../controls";

export default class MeetingView extends ReactListener {

  constructor(props) {
    super(props);

    this.state = MeetingView.defaultState;

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

  getPeriod (dt, obj, type) {
    if (!obj || !obj.times){
      return moment(dt).clone();
    }

    return moment(dt).clone()[type](obj.times, obj.period);
  }

  getStage(){
    let now = moment();
    let meeting = this.state.meeting;
    let when = moment(meeting.when);
    let duration = meeting.duration || { times: 1, period: 'hours' };

    let end = this.getPeriod(when, duration, 'add');
    let historic = this.getPeriod(end, { times: 1, period: 'weeks' }, 'add');

    let cStart = meeting.confirmation && this.getPeriod(when, meeting.confirmStart, 'subtract');
    let cEnd = meeting.confirmation && this.getPeriod(when, meeting.confirmEnd, 'subtract');

    let stage = 'joining';

    if (meeting.confirmation && now > cStart && now < cEnd){
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
        <Grid className="meeting">

          <div className="meeting-when" title={when_str}>{time}</div>

          <Row>
            <Col xs={10}>
              <h2>{meeting.title ? meeting.title : __.meeting_default_title}</h2>
            </Col>
          </Row>

          <Row className="visible-xs visible-sm">
            <Col sm={12}>
              <Button bsStyle='link' className="collapse-title pull-left"
                onClick={ ()=> this.setState({ info_open: !this.state.info_open, map_open: false })}>
                <Icon name={this.state.info_open ? "chevron-down" : "chevron-up"}/>
                {__.meeting_info}
              </Button>
              <Button bsStyle='link' className="collapse-title pull-right"
                onClick={ ()=> this.setState({ map_open: !this.state.map_open, info_open: false })}>
                <Icon name={this.state.map_open ? "chevron-down" : "chevron-up"}/>
                {__.meeting_place}
              </Button>
            </Col>
          </Row>

          <Row>

            {meeting.info ?
            <Col xs={12} sm={12} md={6}>

              <Button bsStyle='link' className="collapse-title hidden-xs hidden-sm"
                onClick={ ()=> this.setState({ info_open: !this.state.info_open })}>
                <Icon name={this.state.info_open ? "chevron-down" : "chevron-up"}/>
                {__.meeting_info}
              </Button>

              <Collapse in={this.state.info_open}>
                <p className="description">{meeting.info}</p>
              </Collapse>
            </Col>
            : null }

            <Col xs={12} sm={12} md={6} className="map-section">

              <Button bsStyle='link' className="collapse-title hidden-xs hidden-sm"
                onClick={ ()=> this.setState({ map_open: !this.state.map_open })}>
                <Icon name={this.state.map_open ? "chevron-down" : "chevron-up"}/>
                {__.meeting_place}
              </Button>

              <Collapse in={this.state.map_open}>

                <GMap readOnly={true}
                  place={meeting.place}
                  location={meeting.location} />
              </Collapse>
            </Col>

          </Row>

          <Row>
            <Col xs={12} sm={10} smOffset={1}>
              <Attendees meeting={meeting} stage={stage} />
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }

};

MeetingView.displayName = "MeetingView";

MeetingView.defaultState = {
  info_open: false,
  map_open: true
};
