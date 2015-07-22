
import UserStore from '../../stores/User';
import UserActions from '../../actions/User';

import UserList from './List.jsx';

import ReactListener from '../ReactListener';

export default class SearchUser extends ReactListener {

  constructor(props) {
    super(props);

    this.state.users = [];
    this.state.invites = [];
    this.store = UserStore;
  }

  componentDidMount() {
    super.componentDidMount();
    $(React.findDOMNode(this.refs.modal)).openModal({
      dismissible: false
    });
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
        picture: '',
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
    React.findDOMNode(this.refs.searchbox).value = '';
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
    $(React.findDOMNode(this.refs.modal)).closeModal();
    this.props.onClose();
  }

  render() {

    return (
      <div id="user-search" ref="modal" className="modal col s12 m10 l6 modal-full user-search">
        <div className="modal-content">
          <h4>Invitar al Grupo</h4>

          <div className="row">
            <span className="right">{"Invitaciones (" + this.state.invites.length + "/ 10)"}</span>
          </div>

          <UserList cssClass="s12 invites" message="click para quitar"
            users={this.state.invites}
            onSelect={ invite => { this.onSelectInvite(invite); } } />

          <div className="row no-margin">
            <input ref="searchbox" className="col s10" type="text"
              onKeyUp={ e => { this.onKeyUp(e); } }
              placeholder="nombre o email"/>

            { this.state.showAddEmail ?
              <a className="waves-effect waves-light btn-floating compose plus-icon"
                onClick={ e => { this.addEmail(e) } }>
                <i className="material-icons teal-text">add_circle</i>
                <i className="material-icons">mail</i>
              </a>
            : '' }
          </div>

          <UserList cssClass="s12 m10"
            users={this.state.users}
            onSelect={ user => { this.onSelect(user); } } />

        </div>
        <div className="modal-footer">
          <a className="modal-action modal-close waves-effect waves-green btn-flat left"
            onClick={ e => { this.props.onClose(e); } }>Cerrar</a>
          { this.state.invites.length === 0 ? '' :
          <a className="waves-effect waves-light btn-large"
            onClick={ e => { this.onSend(e); } }>
            <i className="material-icons right">send</i>Invitar
          </a>
          }
        </div>
      </div>
    );
  }

};

SearchUser.displayName = 'SearchUser';
