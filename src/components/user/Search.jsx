
import {UserStore} from "../../stores";
import {UserActions} from "../../actions";

import UserList from "./List.jsx";

import { Button, Row, Col, Modal, Input, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Icon } from "../controls";

export default class SearchUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = SearchUser.defaultState;
  }

  componentDidMount() {
    this.evChangeUser = UserStore.addListener(this.onChangeUser.bind(this));
    UserStore.clear();
  }

  componentWillUnmount() {
    this.evChangeUser.remove();
    UserStore.clear();
  }

  onChangeUser(){
    let users = UserStore.getState();
    this.onSearch(users);
  }

  onKeyUp(e){
    var value = e.target.value;
    this.setState({ search: value });

    UserStore.clear();

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
    this.setState({ search: "" });
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
    let counter = __.member_invitations_count
      .replace('{1}', this.state.invites.length)
      .replace('{2}', 10); //TODO: set a dynamic max

    let addEmail;

    if (this.state.showAddEmail) {
      addEmail = (
        <OverlayTrigger placement='top' overlay={<Tooltip>{__.user_add_by_email}</Tooltip>}>
          <Button onClick={ e => {this.addEmail(e); }}>
            <Icon name="envelope" />
          </Button>
        </OverlayTrigger>
      );
    }

    return (

      <Modal show={this.props.show} onHide={this.props.onClose}>

        <Modal.Header closeButton>
          <Modal.Title>{__.member_invite_group_title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <span className="pull-right">{counter}</span>

          <UserList message={__.member_invite_message}
            users={this.state.invites}
            onSelect={ invite => { this.onSelectInvite(invite); } } />

          <Input type="text" label={__.user_search}
            placeholder={__.user_search_hint}
            value={this.state.search}
            onChange={e => { this.onKeyUp(e); }} />

          {addEmail}

          <UserList users={this.state.users}
            onSelect={ user => { this.onSelect(user); } } />

        </Modal.Body>

        <Modal.Footer>

          <Button onClick={this.props.onClose}>Close</Button>

           <Button bsStyle="success" className="pull-right"
              onClick={ e => { this.onSend(e); } } >
            {__.invite}
          </Button>
        </Modal.Footer>

      </Modal>
    );
  }

};

SearchUser.displayName = "SearchUser";
SearchUser.defaultState = {
  users: [],
  invites: [],
  search: ""
};
