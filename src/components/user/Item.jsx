
import { ListGroupItem } from "react-bootstrap";
import { Avatar } from "../controls";

export default class UserItem extends React.Component {

  render() {
    var model = this.props.model;

    return (
      <ListGroupItem className=""
        onClick={ e => { this.props.onSelect(this.props.model); } } >
        <Avatar src={model.picture} />
        <span>{model.name}</span>
      </ListGroupItem>
    );
  }

};

UserItem.displayName = "UserItem";
