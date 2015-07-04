
import GroupList from './GroupList.jsx';
import GroupsStore from '../stores/Groups';

export default class Groups extends React.Component {

  render() {

    return (
      <div className="groups">
        <GroupList collection={GroupsStore.instance} />
      </div>
    );
  }

};

