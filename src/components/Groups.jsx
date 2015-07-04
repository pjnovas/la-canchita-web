
import NavBar from './NavBar.jsx';
import GroupList from './GroupList.jsx';
import GroupsStore from '../stores/Groups';

export default class Groups extends React.Component {

  render() {

    return (
      <div>
        <div className="masthead clearfix">
          <div className="inner">
            <h3 className="masthead-brand">Mis Grupos</h3>
            <NavBar />
          </div>
        </div>
        <div className="inner cover groups">
          <GroupList collection={GroupsStore.instance} />
        </div>
      </div>
    );
  }

};

