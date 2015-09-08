
import { MeetingActions } from "../../actions";
import MeetingItem from "./Item.jsx";

import { Grid, Row, Col } from "react-bootstrap";
import { ActionButton } from "../controls";

export default class MeetingList extends React.Component {

  constructor(props) {
    super(props);
    this.editors = ["owner", "admin"];
  }

  removeMeeting(id){
    MeetingActions.destroy(id);
  }

  render() {
    let list = this.props.meetings;
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
                  myRole={this.props.myRole} isPast={true} />);
              })}
            </div>
          </div>
          : null }

          { canCreate ?
            <ActionButton bsStyle="primary" icon="plus"
              to="meetingnew" params={{groupId: this.props.groupId}}/>
          : null }

        </Row>
      </Grid>
    );
  }

};

MeetingList.displayName = "MeetingList";
