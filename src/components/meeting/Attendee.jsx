
import { ListGroupItem, Col, Label } from "react-bootstrap";
import { Avatar } from "../controls";

export default class Attendee extends React.Component {

  openMeeting() {
    window.app.router.transitionTo("meeting", { meetingId: this.props.model.id });
  }

  render() {
    let model = this.props.model;
    let time = moment(model.createdAt).from();

    return (
      <ListGroupItem className="row">
        <Col xs={2} sm={1}>
          <Avatar src={model.user.picture} />
        </Col>
        <Col xs={8} sm={11}>
          <h3>{model.user.name}</h3>
        </Col>
        <Label className="pull-right" bsSize="medium" bsStyle="info">{time}</Label>
      </ListGroupItem>
    );
  }

};

Attendee.displayName = "Attendee";
