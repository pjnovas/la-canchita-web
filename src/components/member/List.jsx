
import MemberStore from '../../stores/Member';
import MemberActions from '../../actions/Member';

import {Link} from 'react-router';
import MemberItem from './Item.jsx';

import ReactListener from '../ReactListener';

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

  render() {
    var list = this.state.members;
    return (
      <div className="members">
        <ul className="collection">
        {this.state.members.map(member => {
          return <MemberItem key={member.id} model={member} />;
        })}
        </ul>

        <div className="fixed-action-btn">
          <a className="btn-floating btn-large">
            <i className="large material-icons">person_add</i>
          </a>
          <ul>
            <li>
              <a className="btn-floating blue-grey darken-1">
                <i className="material-icons">person_outline</i>
              </a>
            </li>
            <li>
              <a className="btn-floating lime darken-2">
                <i className="material-icons">my_location</i>
              </a>
            </li>
            <li>
              <a className="btn-floating blue">
                <i className="material-icons">mail</i>
              </a>
            </li>
            <li>
              <a className="btn-floating">
                <i className="material-icons">add</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

};

MemberList.displayName = 'MemberList';
