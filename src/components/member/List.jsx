
import {GroupActions} from "../../actions";

import MemberItem from "./Item.jsx";
import UserInvite from "../user/Search.jsx";

import { Grid, Row, Col } from "react-bootstrap";
import { ActionButton } from "../controls";

export default class MemberList extends React.Component {

  constructor(props) {
    super(props);
    this.state = MemberList.defaultState;
    this.inviters = ["owner", "admin", "moderator"];
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

    GroupActions.invite(this.props.groupId, { users, emails });
  }

  kickMember(id) {
    GroupActions.kick(this.props.groupId, id);
  }

  changeRole(id, role) {
    GroupActions.setRole(this.props.groupId, id, role);
  }

  render() {
    let list = this.props.members;

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
      <Grid>
        <Row>

          <div className="list-group">
            {active.map(member => {
              return (
                <MemberItem
                  key={member.id} model={member} myRole={this.props.myRole}
                  kickMember={ mid => { this.kickMember(mid); } }
                  changeRole={ (mid, role) => { this.changeRole(mid, role); } }/>
              );
            })}
          </div>

          { pending.length ?
          <div>
            <h4>{__.member_invited}</h4>
            <div className="list-group">
              {pending.map(member => {
                return (<MemberItem key={member.id} model={member} />);
              })}
            </div>
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

        </Row>
      </Grid>
    );
  }

};

MemberList.displayName = "MemberList";
MemberList.defaultState = {
  showInvite: false
};
