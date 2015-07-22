
import UserItem from './Item.jsx';

export default class UserList extends React.Component {

  render() {
    var users = this.props.users;

    if (!users.length){
      return (<div></div>);
    }

    return (
      <div className="row">

        { !this.props.message ? null :
        <label className="col s12 left">{this.props.message}</label>
        }

        <div className={"collection col s12 " + this.props.cssClass}>
        { users.length === 0 ? null :
            users.map(user => {
              return <UserItem
                key={user.id} model={user}
                onSelect={ user => { this.props.onSelect(user); } } />;
            })
        }
        </div>

      </div>
    );
  }

};

UserList.displayName = 'UserList';

