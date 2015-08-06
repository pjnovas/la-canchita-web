
import UserItem from "./Item.jsx";
import { ListGroup } from "react-bootstrap";

export default class UserList extends React.Component {

  render() {
    var users = this.props.users;

    if (!users.length){
      return (<ListGroup></ListGroup>);
    }

    return (
      <div>
        { !this.props.message ? null : <label>{this.props.message}</label> }
        <ListGroup>

          { users.length === 0 ? null :
            users.map(user => {
              return <UserItem key={user.id} model={user}
                onSelect={ user => { this.props.onSelect(user); } } />;
            })
          }

        </ListGroup>
      </div>
    );
  }

};

UserList.displayName = "UserList";

