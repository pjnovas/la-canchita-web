
import MemberStore from '../../stores/Member';
import MemberActions from '../../actions/Member';

import MemberItem from './Item.jsx';
import UserInvite from '../user/Search.jsx';

import ReactListener from '../ReactListener';
import {ButtonAction} from '../controls';

export default class MemberList extends ReactListener {

  constructor(props) {
    super(props);

    this.state.gid = this.props.groupId;
    this.state.members = [];

    this.store = MemberStore;
  }

  componentDidMount() {
    super.componentDidMount();
    MemberActions.find(this.state.gid);
  }

  onFind(members) {
    super.onFind();
    this.setState({ members });
  }

  showInvite(){
    this.setState({ showInvite: true });
  }

  hideInvite(){
    this.setState({ showInvite: false });
  }

  inviteUser(user) {
    console.log(user);
  }

  inviteEmail(email) {
    console.log(user);
  }

  render() {
    var list = this.state.members;
    var skipIds = list.map( member => {
      return member.user.id;
    });

    return (
      <div>

        { this.state.showInvite ?
          <UserInvite
            skipIds={ skipIds }
            onSelect={ user => { this.inviteUser(user); } }
            onClose={ () => { this.hideInvite(); } } /> : '' }

        <div className="members">
          <ul className="collection">
          {this.state.members.map(member => {
            return <MemberItem key={member.id} model={member} />;
          })}
          </ul>

          <ButtonAction icon="person_add"
            onClick={ e => { this.showInvite(e); }} />
        </div>
      </div>
    );
  }

};

MemberList.displayName = 'MemberList';
