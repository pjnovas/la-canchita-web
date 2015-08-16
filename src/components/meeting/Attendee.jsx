
import { Row, Col, Label } from "react-bootstrap";
import { Avatar, Icon } from "../controls";

export default class Attendee extends React.Component {

  openMeeting() {
    window.app.router.transitionTo("meeting", { meetingId: this.props.model.id });
  }

  render() {
    let model = this.props.model;
    let time = moment(model.createdAt).from();

    return (
      <div className="list-group-item">
        <Row>

          <Col xs={2} sm={1} className="avatar-col">
            <Avatar src={model.user.picture} />
          </Col>

          <Col xs={10} sm={11}>
            <h4 className="list-group-item-heading">{model.user.name}</h4>
            <p className="ellipsis">Arquero > Defensor > Medio Campo</p>
          </Col>

          {model.isConfirmed ?
          <div className="right-icon"><Icon name="check" /></div>
          : null }

          <Label className="timestamp" bsSize="medium" bsStyle="info">{time}</Label>

        </Row>
      </div>
    );
  }

};

Attendee.displayName = "Attendee";
