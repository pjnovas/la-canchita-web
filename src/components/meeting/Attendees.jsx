
import MeetingActions from "../../actions/Meeting";

import Attendee from "./Attendee.jsx";
import ReactListener from "../ReactListener";

import { Row, Col, ListGroup, Button } from "react-bootstrap";
import { ActionButton } from "../controls";

export default class Attendees extends ReactListener {

  onClickJoin(e){
    MeetingActions.join(this.props.meeting.id);
  }

  onClickLeave(e){
    MeetingActions.leave(this.props.meeting.id);
  }

  render() {
    let meeting = this.props.meeting;
    let stage = this.props.stage;
    let list = meeting.attendees;

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

    let canLeave = (stage === "joining" && !canJoin ? true : false);


    return (
      <Row>
        <Col xs={12}>

          <h5>Jugadores</h5>

          <ListGroup>
            {list.map(attendee => {
              return (<Attendee key={attendee.id} model={attendee}/>);
            })}
          </ListGroup>

          { replacements.length ?
          <div>
            <h5>Suplentes</h5>

            <ListGroup>
              {replacements.map(attendee => {
                return (<Attendee key={attendee.id} model={attendee}/>);
              })}
            </ListGroup>
          </div>
          : null }

          { canJoin ?
            <ActionButton bsStyle="primary" icon="pencil-square-o"
              onClick={ e => { this.onClickJoin(e); } }/>
          : null }

          { canLeave ?
            <ActionButton bsStyle="primary" icon="close"
              onClick={ e => { this.onClickLeave(e); } }/>
          : null }

        </Col>
      </Row>
    );
  }

};

Attendees.displayName = "Attendees";
