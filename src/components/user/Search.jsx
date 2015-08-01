
import UserStore from "../../stores/User";
import UserActions from "../../actions/User";

import UserList from "./List.jsx";

import ReactListener from "../ReactListener";
import { Dialog, FontIcon, FlatButton, RaisedButton, TextField, IconButton } from "material-ui";

export default class SearchUser extends ReactListener {

  constructor(props) {
    super(props);

    this.state.users = [];
    this.state.invites = [];
    this.store = UserStore;
  }

  onKeyUp(e){
    var value = e.target.value;

    if (value.trim().length === 0){
      this.clear();
      return;
    }

    this.email = null;
    if (this.isValidEmail(value)){
      this.email = value;
      this.setState({ showAddEmail: true });
      return;
    }

    if (this.state.showAddEmail){
      this.setState({ showAddEmail: false });
    }

    UserActions.search(value);
  }

  isValidEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  addEmail(e) {
    if (this.state.showAddEmail && this.email){
      this.onSelect({
        id: this.email,
        name: this.email,
        picture: "",
        isEmail: true
      });
    }
  }

  onSearch(users) {

    if (this.props.skipIds) {
      // remove skip ids
      users = users.filter( user => {
        return this.props.skipIds.indexOf(user.id) === -1;
      });
    }

    // remove invites
    users = users.filter( user => {
      return !this.state.invites.some( invite => {
        return (user.id === invite.id);
      });
    });

    this.setState({ users: users });
  }

  onSelect(invite){

    var exist = this.state.invites.some( user => {
      return (user.id === invite.id);
    });

    if (!exist){
      this.state.invites.push(invite);
      this.setState({ invites: this.state.invites });
    }

    this.clear();
  }

  clear() {
    this.refs.searchbox.setValue("");
    this.setState({ users: [] });

    this.setState({ showAddEmail: false });
    this.email = null;
  }

  onSelectInvite(user){
    var filter = this.state.invites.filter( invite => {
      return (user.id !== invite.id);
    });

    this.setState({ invites: filter });
  }

  onSend(){
    this.props.onSelect(this.state.invites);
    this.props.onClose();
  }

  render() {
    var iconcss = Theme.merge("raisedButtonLink", "right");
    var counter = __.member_invitations_count
      .replace('{1}', this.state.invites.length)
      .replace('{2}', 10); //TODO: set a dynamic max

    let actions = [
      <FlatButton label={__.close} secondary={true}
        onClick={ e => { this.props.onClose(e); } } />,

      <RaisedButton primary={true} label={__.invite}
        onClick={ e => { this.onSend(e); } }>
        <FontIcon className="material-icons" style={iconcss}>send</FontIcon>
      </RaisedButton>
    ];

    return (

      <Dialog openImmediately={true} title={__.member_invite_group_title}
        actions={actions} modal={true}>

        <span style={Theme.css.right}>{counter}</span>

        <UserList message={__.member_invite_message}
          users={this.state.invites}
          onSelect={ invite => { this.onSelectInvite(invite); } } />

        <TextField floatingLabelText={__.user_search} ref="searchbox"
          hintText={__.user_search_hint}
          onKeyUp={e => { this.onKeyUp(e); }} />

        { this.state.showAddEmail ?
          <IconButton tooltip={__.user_add_by_email}
            onClick={ e => { this.addEmail(e) } }>
              <FontIcon className="material-icons">mail</FontIcon>
          </IconButton>
        : null }

        <UserList users={this.state.users}
          onSelect={ user => { this.onSelect(user); } } />

      </Dialog>
    );
  }

};

SearchUser.displayName = "SearchUser";
