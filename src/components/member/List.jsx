
import MemberStore from "../../stores/Member";
import MemberActions from "../../actions/Member";

import MemberItem from "./Item.jsx";
import UserInvite from "../user/Search.jsx";

import ReactListener from "../ReactListener";

import { List, Avatar, FontIcon, FloatingActionButton } from "material-ui";

export default class MemberList extends ReactListener {

  constructor(props) {
    super(props);

    this.state.gid = this.props.groupId;
    this.state.members = [];

    this.store = MemberStore;
    this.inviters = ["owner", "admin", "moderator"];
  }

  componentDidMount() {
    super.componentDidMount();
    MemberActions.find(this.state.gid);
  }

  onFind(members) {
    super.onFind();
    this.setState({ members });
  }

  onInvite(members){
    this.setState({ members });
  }

  onSetrole(members){
    this.setState({ members });
  }

  onKick(members){
    this.setState({ members });
  }

  showInvite(){
    this.setState({ showInvite: true });
  }

  hideInvite(){
    this.setState({ showInvite: false });
  }

  inviteUsers(invites) {
    if (!invites.length){
      return;
    }

    var users = [];
    var emails = [];

    invites.forEach( invite => {
      if (invite.isEmail){
        emails.push(invite.id);
      }
      else {
        users.push(invite.id);
      }
    });

    MemberActions.invite(this.state.gid, { users, emails });
  }

  kickMember(id) {
    MemberActions.kick(this.state.gid, id);
  }

  changeRole(id, role) {
    MemberActions.setRole(this.state.gid, { id, role });
  }

  render() {
    var list = this.state.members;

    var active = list.filter( member => {
      return member.state === "active";
    });

    var pending = list.filter( member => {
      return member.state === "pending";
    });

    var skipIds = active.concat(pending).map( member => {
      return member.user.id;
    });

    var me = active.find( member => {
      return member.user.id === window.user.id;
    });

    var myRole = me && me.role || "member";
    var canInvite = this.inviters.indexOf(myRole) > -1;

    return (
      <div>

        { this.state.showInvite ?
          <UserInvite
            skipIds={ skipIds }
            onSelect={ users => { this.inviteUsers(users); } }
            onClose={ () => { this.hideInvite(); } } /> : null }

        <List>
        {active.map(member => {
          return <MemberItem
            key={member.id} model={member} myRole={myRole}
            kickMember={ mid => { this.kickMember(mid); } }
            changeRole={ (mid, role) => { this.changeRole(mid, role); } }/>;
        })}
        </List>

        { pending.length ?
        <List subheader="Invitados">
          {pending.map(member => {
            return <MemberItem key={member.id} model={member} />;
          })}
        </List>
        : null }

        { this.props.isVisible && canInvite ?
        <FloatingActionButton primary={true} tooltip={__.group_create}
          linkButton={true} style={Theme.css.actionButton}
          onClick={ e => { this.showInvite(e); }} >
          <FontIcon className="material-icons">person_add</FontIcon>
        </FloatingActionButton>
        : null }

      </div>
    );
  }

};

MemberList.displayName = "MemberList";
