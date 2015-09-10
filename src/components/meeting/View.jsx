
import { MeetingStore } from "../../stores";
import { MeetingActions } from "../../actions";

import Header from "../Header.jsx";
import Attendees from "./Attendees.jsx";
import MeetingDetail from "./Detail.jsx";
import MeetingMap from "./Map.jsx";

import { Grid, Row, Col, Button, Collapse, TabbedArea, TabPane } from "react-bootstrap";
import { ActionButton, GMap, Icon } from "../controls";

export default class MeetingView extends React.Component {

  constructor(props) {
    super(props);

    this.state = MeetingView.defaultState;

    this.state.gid = "";
    this.state.id = this.props.params.meetingId;
    this.store = MeetingStore;
  }

  componentDidMount() {
    this.evChangeMeeting = MeetingStore.addListener(this.onChangeMeeting.bind(this));
    this.evErrorMeeting = MeetingStore.onError(this.onError.bind(this));

    let meeting = MeetingStore.getStateById(this.state.id);

    if (meeting){
      this.onChangeMeeting();
    }

    MeetingActions.findOne(this.state.id);
  }

  componentWillUnmount() {
    this.evChangeMeeting.remove();
    this.evErrorMeeting.remove();
    MeetingActions.leaveRoom(this.state.id);
  }

  onError(error){
    if (error.status === 404){
      window.location = "/notfound";
    }
  }

  onChangeMeeting(){
    let meeting = MeetingStore.getStateById(this.state.id);
    this.setState({ meeting, gid: meeting.group.id });
    setTimeout(() => MeetingActions.joinRoom(meeting.id), 100);
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
  }

  render() {
    let meeting = this.state.meeting;

    if (!meeting){
      return (<span>{__.loading}</span>);
    }

    let stage = this.getStage();

    return (
      <div className="meeting">

        <Header backto="grouptab" flat={true}
          backparams={ { groupId: this.state.gid, tab: "meetings" } } />

        <TabbedArea defaultActiveKey={1}  activeKey={this.state.selectedKey}
          animation={false} onSelect={ (key) => { this.onChangeTab(key); } }>

          <TabPane key={1} eventKey={1} tab={__.meeting_tab_info}>
            <MeetingDetail meeting={meeting} stage={stage} />
          </TabPane>

          <TabPane key={2} eventKey={2} tab={__.meeting_tab_place}>
            <MeetingMap meeting={meeting} />
          </TabPane>

          <TabPane key={3} eventKey={3} tab={__.meeting_tab_attendees}>
            <Attendees meeting={meeting} stage={stage} />
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
