
import { MeetingStore } from "../../stores";
import { MeetingActions } from "../../actions";

import Header from "../Header.jsx";
import Attendees from "./Attendees.jsx";

import { Grid, Row, Col, Button, Collapse, TabbedArea, TabPane } from "react-bootstrap";
import { ActionButton, GMap, Icon } from "../controls";

export default class MeetingView extends React.Component {

  constructor(props) {
    super(props);

    this.state = MeetingView.defaultState;

    this.state.gid = "";
    this.state.id = this.props.params.meetingId;
    this.store = MeetingStore;

    this.editors = ["owner", "admin"];
  }

  componentDidMount() {
    this.evChangeMeeting = MeetingStore.addListener(this.onChangeMeeting.bind(this));
    this.evErrorMeeting = MeetingStore.onError(this.onError.bind(this));

    MeetingActions.findOne(this.state.id);
  }

  componentWillUnmount() {
    this.evChangeMeeting.remove();
    this.evErrorMeeting.remove();
    //MeetingActions.leaveRoom(this.state.id);
  }

  onError(error){
    if (error.status === 404){
      window.location = "/notfound";
    }
  }

  onChangeMeeting(){
    let meeting = MeetingStore.getStateById(this.state.id);
    this.setState({ meeting, me: meeting.group.member, gid: meeting.group.id });
    //setTimeout(() => MeetingActions.joinRoom(meeting.id), 100);
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
    let duration = meeting.duration || { times: 1, period: "hours" };

    let end = this.getPeriod(when, duration, "add");
    let historic = this.getPeriod(end, { times: 1, period: "weeks" }, "add");

    let cStart = meeting.confirmation && this.getPeriod(when, meeting.confirmStart, "subtract");
    let cEnd = meeting.confirmation && this.getPeriod(when, meeting.confirmEnd, "subtract");

    let stage = "joining";

    if (meeting.confirmation && now > cStart && now < cEnd){
      stage = "confirming";
    }
    else if (now > when && now < end) {
      stage = "running";
    }
    else if (now > end) {
      stage = "historic";

      if (now < historic){
        stage = "played";
      }
    }

    return stage;
  }

  onChangeTab(key){
    this.setState({ selectedKey: key });
    if (key == 2){
      // hack to make gmap render
      window.setTimeout(() => this.refs.gmap.markPlace(), 100);
    }
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

    let duration = meeting.duration || { times: 1, period: "hours" };

    duration = " " + duration.times + " " +
      __["periods_" + duration.period + (duration.times === 1 ? "_singular" : "")];

    return (
      <div className="meeting">

        <Header backto="grouptab" flat={true}
          backparams={ { groupId: this.state.gid, tab: "meetings" } } />

        <TabbedArea defaultActiveKey={1}  activeKey={this.state.selectedKey}
          animation={false} onSelect={ (key) => { this.onChangeTab(key); } }>

          <TabPane key={1} eventKey={1} tab={__.meeting_tab_info}>
            <Grid>

              <Row>
                <Col xs={12} sm={8} md={6}>
                  <div className={"meeting-when " + stage}
                    title={__["meeting_stage_" + stage]}>
                    {when_str}, {time}<span className="visible-xs">({duration})</span>
                  </div>
                </Col>
                <Col xs={12} sm={4} md={6} className="hidden-xs text-right">
                  <div className="meeting-duration">{__.meeting_duration}{duration}</div>
                </Col>
              </Row>

              <Row>
                <Col xs={12} sm={7} md={6}>
                  <h2>{meeting.title ? meeting.title : __.meeting_default_title}</h2>
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

          <TabPane key={2} eventKey={2} tab={__.meeting_tab_place}>
            <Grid>
              <Row>
                <Col xs={12} sm={12} md={10} mdOffset={1} className="map-section">
                  <GMap ref="gmap" readOnly={true}
                    place={meeting.place}
                    location={meeting.location} />
                </Col>
              </Row>
              <ActionButton bsStyle="primary" icon="location-arrow"
                href={link} target="_blank"/>
            </Grid>
          </TabPane>

          <TabPane key={3} eventKey={3} tab={__.meeting_tab_attendees}>
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
