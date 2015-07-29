
import MeetingStore from '../../stores/Meeting';
import MeetingActions from '../../actions/Meeting';

import MeetingItem from './Item.jsx';
import UserInvite from '../user/Search.jsx';

import ReactListener from '../ReactListener';
import {ButtonAction} from '../controls';

export default class MeetingList extends ReactListener {

  constructor(props) {
    super(props);

    this.state.gid = this.props.groupId;
    this.state.meetings = [];

    this.store = MeetingStore;
    this.editors = ['owner', 'admin'];
  }

  componentDidMount() {
    super.componentDidMount();
    MeetingActions.find(this.state.gid);
  }

  onFind(meetings) {
    super.onFind();
    this.setState({ meetings });
  }

  render() {
    var list = this.state.meetings;

    var active = list;
    var past = list;

    var canCreate = true; //this.editors.indexOf(myRole) > -1;

    return (
      <div>

        <div className="meetings">

          <ul className="collection">
          {active.map(meeting => {
            return <MeetingItem key={meeting.id} model={meeting}/>;
          })}
          </ul>

          { past.length ?
          <div>
            <span className="category-title">Finalizados</span>
            <ul className="collection done">
            {past.map(meeting => {
              return <MeetingItem key={meeting.id} model={meeting} />;
            })}
            </ul>
          </div>
          : null }

        </div>

        { canCreate ?
        <ButtonAction icon="add" to="meetingnew" params={{ groupId: this.state.gid }}/>
        : null }
      </div>
    );
  }

};

MeetingList.displayName = 'MeetingList';
