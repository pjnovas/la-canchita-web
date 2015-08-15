
import MeetingStore from "../../stores/Meeting";
import MeetingActions from "../../actions/Meeting";

import MeetingItem from "./Item.jsx";

import ReactListener from "../ReactListener";

import { Grid, Row, Col } from "react-bootstrap";
import { ActionButton } from "../controls";

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

  removeMeeting(id){
    MeetingActions.destroy(this.state.gid, id);
  }

  onFind(meetings) {
    super.onFind();
    this.setState({ meetings });
  }

  onDestroy(meetings) {
    this.setState({ meetings });
  }

  render() {
    let list = this.state.meetings;
    let now = moment();

    let active = list.filter( meeting => {
      let when = moment(meeting.when);
      let duration = meeting.duration || { times: 1, period: 'hours' };
      let end = when.clone().add(duration.times, duration.period);

      return when >= now || (now >= when && now <= end);
    });

    let past = list.filter( meeting => {
      return moment(meeting.when) < now;
    });

    active.sort((a, b) => {
      a = moment(a.when);
      b = moment(b.when);
      return b>a ? -1 : b<a ? 1 : 0;
    });

    past.sort((a, b) => {
      a = moment(a.when);
      b = moment(b.when);
      return b<a ? -1 : b>a ? 1 : 0;
    });

    let canCreate = this.editors.indexOf(this.props.myRole) > -1;

    return (
      <Grid>
        <Row className="meeting-tab">
          <Col xs={12}>

            <div className="list-group">
              {active.map(meeting => {
                return (<MeetingItem key={meeting.id} model={meeting}
                  removeMeeting={ mid => { this.removeMeeting(mid) }}
                  myRole={this.props.myRole} />);
              })}
            </div>

            { past.length ?
            <div>
              <h4>{__.meeting_past}</h4>
              <div className="list-group">
                {past.map(meeting => {
                  return (<MeetingItem key={meeting.id} model={meeting}
                    myRole={this.props.myRole} hideActions={true} />);
                })}
              </div>
            </div>
            : null }

            { canCreate ?
              <ActionButton bsStyle="primary" icon="plus"
                to="meetingnew" params={{groupId: this.state.gid}}/>
            : null }

          </Col>
        </Row>
      </Grid>
    );
  }

};

MeetingList.displayName = "MeetingList";
