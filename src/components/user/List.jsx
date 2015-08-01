
import UserItem from "./Item.jsx";
import { List } from "material-ui";

export default class UserList extends React.Component {

  render() {
    var users = this.props.users;

    if (!users.length){
      return (<List></List>);
    }

    return (
      <List>

        { !this.props.message ? null : <label>{this.props.message}</label> }

        { users.length === 0 ? null :
          users.map(user => {
            return <UserItem key={user.id} model={user}
              onSelect={ user => { this.props.onSelect(user); } } />;
          })
        }

      </List>
    );
  }

};

UserList.displayName = "UserList";

