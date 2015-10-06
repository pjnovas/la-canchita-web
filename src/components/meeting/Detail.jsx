
import { Grid, Row, Col } from "react-bootstrap";
import { ActionButton } from "../controls";

export default class MeetingDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = MeetingDetail.defaultState;
    this.editors = ["owner", "admin"];
  }

  render() {
    let meeting = this.props.meeting;
    let me = meeting.group.member;

    let when = moment(meeting.when);
    let time = when.from();
    let when_str = when.format(__.full_datetime_format);

    let myRole = me && me.role || "member";
    let canEdit = this.editors.indexOf(myRole) > -1;

    let duration = meeting.duration || { times: 1, period: "hours" };

    duration = " " + duration.times + " " +
      __["periods_" + duration.period + (duration.times === 1 ? "_singular" : "")];

    if (["cancelled", "historic", "running", "played"].indexOf(this.props.stage) > -1){
      canEdit = false;
    }

    return (
      <Grid className="meeting-detail">

        <Row>
          <Col xs={12} sm={8} md={6}>
            <div className={"meeting-when " + this.props.stage}
              title={__["meeting_stage_" + this.props.stage]}>
              {when_str}, {time}<span className="visible-xs">({duration})</span>
            </div>
          </Col>
          <Col xs={12} sm={4} md={6} className="hidden-xs text-right">
            <div className="meeting-duration">{__.meeting_duration}{duration}</div>
          </Col>
        </Row>

        <Row>
          <Col xs={12} className="title">
            <h1>{meeting.title ? meeting.title : __.meeting_default_title}</h1>
          </Col>
        </Row>

        <Row>
          {meeting.info ?
          <Col xs={12} className="description">
            {meeting.info}
          </Col>
          : null }
        </Row>

        { canEdit ?
          <ActionButton bsStyle="primary" icon="pencil"
            to="meetingedit" params={{meetingId: meeting.id}}/>
        : null }

      </Grid>
    );
  }

};

MeetingDetail.displayName = "MeetingDetail";
MeetingDetail.defaultState = {

};
