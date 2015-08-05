
import { ListGroupItem } from "react-bootstrap";

export default class MeetingItem extends React.Component {

  render() {
    var model = this.props.model;

    return (
      <ListGroupItem>{model.title}</ListGroupItem>
    );
  }

};

MeetingItem.displayName = "MeetingItem";
