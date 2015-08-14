
import MemberStore from "../../stores/Member";
import MemberActions from "../../actions/Member";

import MemberItem from "./Item.jsx";
import UserInvite from "../user/Search.jsx";

import ReactListener from "../ReactListener";

import { Row, Col, ListGroup } from "react-bootstrap";
import { ActionButton } from "../controls";

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

    let users = [];
    let emails = [];

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
    let list = this.state.members;

    let active = list.filter( member => {
      return member.state === "active";
    });

    let pending = list.filter( member => {
      return member.state === "pending";
    });

    let skipIds = active.concat(pending).map( member => {
      return member.user.id;
    });

    let canInvite = this.inviters.indexOf(this.props.myRole) > -1;

    return (
      <Row>

        <Col xs={12}>

          <ListGroup>
            {active.map(member => {
              return (
                <MemberItem
                  key={member.id} model={member} myRole={this.props.myRole}
                  kickMember={ mid => { this.kickMember(mid); } }
                  changeRole={ (mid, role) => { this.changeRole(mid, role); } }/>
              );
            })}
          </ListGroup>

          { pending.length ?
          <div>
            <h4>{__.member_invited}</h4>
            <ListGroup>
              {pending.map(member => {
                return (<MemberItem key={member.id} model={member} />);
              })}
            </ListGroup>
          </div>
          : null }

          { canInvite ?
            <div>
              <ActionButton bsStyle="primary" icon="user-plus"
                onClick={ e => { this.showInvite(e); }}/>

              <UserInvite
                skipIds={ skipIds }
                show={this.state.showInvite}
                onSelect={ users => { this.inviteUsers(users); } }
                onClose={ () => { this.hideInvite(); } } />
            </div>
          : null }

        </Col>
      </Row>
    );
  }

};

MemberList.displayName = "MemberList";
