
import { ListItem } from "material-ui";

export default class MeetingItem extends React.Component {

  render() {
    var model = this.props.model;

    return (
      <ListItem style={{ borderBottom: "1px solid #EAEAEA" }}
        primaryText={model.title}/>
    );
  }

};

MeetingItem.displayName = "MeetingItem";
