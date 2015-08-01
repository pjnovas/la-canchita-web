
import { ListItem, Avatar } from "material-ui";

export default class UserItem extends React.Component {

  render() {
    var model = this.props.model;

    return (
      <ListItem style={{ borderBottom: "1px solid #EAEAEA" }}
        leftAvatar={<Avatar src={model.picture} />}
        primaryText={model.name}
        onClick={ e => { this.props.onSelect(this.props.model); } } />
    );
  }

};

UserItem.displayName = "UserItem";
