
import MeetingActions from "../../actions/Meeting";

import Attendee from "./Attendee.jsx";
import ReactListener from "../ReactListener";

import { Row, Col, ListGroup, Button, Badge } from "react-bootstrap";
import { ActionButton } from "../controls";

export default class Attendees extends ReactListener {

  onClickJoin(e){
    MeetingActions.join(this.props.meeting.id);
  }

  onClickLeave(e){
    MeetingActions.leave(this.props.meeting.id);
  }

  onClickConfirm(e){
    MeetingActions.confirm(this.props.meeting.id);
  }

  getPeriod (dt, obj, type) {
    if (!obj || !obj.times){
      return moment(dt).clone();
    }

    return moment(dt).clone()[type](obj.times, obj.period);
  }

  render() {
    let meeting = this.props.meeting;
    let stage = this.props.stage;
    let list = meeting.attendees;
    let when = moment(meeting.when);

    list.sort((a, b) => {
      a = moment(a.createdAt);
      b = moment(b.createdAt);
      return b>a ? -1 : b<a ? 1 : 0;
    });

    let me = list.filter( attendee => { return window.user.id === attendee.user.id; });
    me = (me.length ? me[0] : null);

    let replacements = [];
    let canJoin = (["joining", "confirming"].indexOf(stage) > -1 ? true : false);
    canJoin = canJoin && !me ? true : false;

    let canConfirm = (stage === "confirming" && !canJoin && !me.isConfirmed ? true : false);
    let canLeave = (["joining", "confirming"].indexOf(stage) > -1 && !canJoin && !me.isConfirmed ? true : false);

    let cStart = meeting.confirmation && this.getPeriod(when, meeting.confirmStart, 'subtract');
    let cEnd = meeting.confirmation && this.getPeriod(when, meeting.confirmEnd, 'subtract');

    let sStart = moment(cStart).format(__.full_datetime_format);
    let sEnd = moment(cEnd).format(__.full_datetime_format);

    return (
      <div>

        <Row>

          <Col xs={6}>
            <h4>Jugadores
            { meeting.max ?
              <Badge>{list.length} / {meeting.max}</Badge>
            :
              <Badge>{list.length}</Badge>
            }
            </h4>
          </Col>

          { meeting.confirmation ?
          <Col xs={6} className="text-right">
          { stage === "confirming" ?
            <h6 className="confirm-timer">
              {__.meeting_confirm_ending_at}
              <span className="time" title={sStart}>{ moment(cEnd).from() }</span>
            </h6>
          :
            <h6 className="confirm-timer">
              {__.meeting_confirm_starting_at}
              <span className="time" title={sEnd}>{ moment(cStart).from() }</span>
            </h6>
          }
          </Col>
          : null }

        </Row>

        <Row>
          <Col xs={12}>

            <ListGroup>
              {list.map(attendee => {
                return (<Attendee key={attendee.id} model={attendee}/>);
              })}
            </ListGroup>

          </Col>
        </Row>

        { replacements.length ?
        <Row>
          <Col xs={12}>
            <h5>Suplentes</h5>

            <ListGroup>
              {replacements.map(attendee => {
                return (<Attendee key={attendee.id} model={attendee}/>);
              })}
            </ListGroup>
          </Col>
        </Row>
        : null }

        { canJoin ?
          <ActionButton bsStyle="primary" icon="pencil-square-o"
            onClick={ e => { this.onClickJoin(e); } }/>
        : null }

        { canLeave ?
          <ActionButton secondary={canConfirm} bsStyle="danger" icon="close"
            onClick={ e => { this.onClickLeave(e); } }/>
        : null }

        { canConfirm ?
          <ActionButton bsStyle="success" icon="check"
            onClick={ e => { this.onClickConfirm(e); } }/>
        : null }

      </div>
    );
  }

};

Attendees.displayName = "Attendees";
