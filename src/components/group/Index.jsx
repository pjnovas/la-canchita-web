
import GroupList from './List.jsx';
import GroupsStore from '../../stores/Groups';

import Header from '../Header.jsx';

export default class Groups extends React.Component {

  render() {

    return (
      <div>
        <Header />
        <div className="container">
          <GroupList collection={GroupsStore.instance} />
        </div>
      </div>
    );
  }

};

