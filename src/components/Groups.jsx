
import NavBar from './NavBar.jsx';
import GroupList from './GroupList';
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
        <div className="inner cover">
          <GroupList collection={GroupsStore.instance} />
        </div>
      </div>
    );
  }

};

