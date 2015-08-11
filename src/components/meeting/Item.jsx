
import { ListGroupItem, Label } from "react-bootstrap";

export default class MeetingItem extends React.Component {

  openMeeting() {
    window.app.router.transitionTo("meeting", { meetingId: this.props.model.id });
  }

  render() {
    let model = this.props.model;
    let time = moment(model.when).from();
    let title = model.title || __.meeting_default_title;
    let place = model.place; //model.place.split(',')[0];

    return (
      <ListGroupItem header={title} href="#" onClick={ e => { this.openMeeting(e); }} >
        {__.meeting_at} {place}
        <Label className="pull-right" bsSize="medium" bsStyle="info">{time}</Label>
      </ListGroupItem>
    );
  }

};

MeetingItem.displayName = "MeetingItem";
