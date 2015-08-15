
import MeetingStore from "../../stores/Meeting";
import MeetingActions from "../../actions/Meeting";

import Header from "../Header.jsx";
import Attendees from "./Attendees.jsx";
import ReactListener from "../ReactListener";

import { Grid, Row, Col, Button, Collapse, TabbedArea, TabPane } from "react-bootstrap";
import { ActionButton, GMap, Icon } from "../controls";

export default class MeetingView extends ReactListener {

  constructor(props) {
    super(props);

    this.state = MeetingView.defaultState;

    this.state.gid = "";
    this.state.id = this.props.params.meetingId;
    this.store = MeetingStore;

    this.editors = ["owner", "admin"];
  }

  componentDidMount() {
    super.componentDidMount();
    MeetingActions.findOne(this.state.id);
  }

  onFind(meeting) {
    super.onFind();
    this.setState({ meeting, me: meeting.group.member, gid: meeting.group.id });
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

  onChangeTab(key){
    this.setState({ selectedKey: key });
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

    let myRole = this.state.me && this.state.me.role || "member";
    let canEdit = this.editors.indexOf(myRole) > -1;

    let label = meeting.place.replace(" ", ",");
    let loc = meeting.location;
    let link = "http://maps.google.com/maps/dir//" + label + "/@" + loc[0] + "," + loc[1] + ",17z";

    return (
      <div className="meeting">

        <Header backto="grouptab" flat={true}
          backparams={ { groupId: this.state.gid, tab: "meetings" } } />

        <TabbedArea defaultActiveKey={1}  activeKey={this.state.selectedKey}
          animation={false} onSelect={ (key) => { this.onChangeTab(key); } }>

          <TabPane eventKey={1} tab={__.meeting_tab_info}>
            <Grid>
              <Row>
                <Col xs={12} sm={7} md={6}>
                  <h2>{meeting.title ? meeting.title : __.meeting_default_title}</h2>
                </Col>

                <Col xs={12} sm={5} md={6} className="text-right">
                  <div className="meeting-when" title={when_str}>{when_str} - {time}</div>
                </Col>
              </Row>

              <Row>
                {meeting.info ?
                <Col xs={12} sm={12} md={10} mdOffset={1}>
                  <p className="description">{meeting.info}</p>
                </Col>
                : null }
              </Row>

              { canEdit ?
                <ActionButton bsStyle="primary" icon="pencil"
                  to="meetingedit" params={{meetingId: meeting.id}}/>
              : null }

            </Grid>
          </TabPane>

          <TabPane eventKey={2} tab={__.meeting_tab_place}>
            <Grid>
              <Row>
                <Col xs={12} sm={12} md={10} mdOffset={1} className="map-section">
                  <GMap readOnly={true}
                    place={meeting.place}
                    location={meeting.location} />
                </Col>
              </Row>
              <ActionButton bsStyle="primary" icon="location-arrow"
                href={link} target="_blank"/>
            </Grid>
          </TabPane>

          <TabPane eventKey={3} tab={__.meeting_tab_attendees}>
            <Grid>
              <Row>
                <Col xs={12} sm={10} smOffset={1}>
                  <Attendees meeting={meeting} stage={stage} />
                </Col>
              </Row>
            </Grid>
          </TabPane>

        </TabbedArea>
      </div>
    );
  }
};

MeetingView.displayName = "MeetingView";

MeetingView.defaultState = {
  selectedKey: 1
};
