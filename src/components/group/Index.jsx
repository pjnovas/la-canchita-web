
import Header from '../Header.jsx';
import GroupList from './List.jsx';

export default class Groups extends React.Component {

  render() {

    return (
      <div>
        <Header />
        <div className="container">
          <GroupList />
        </div>
      </div>
    );
  }

};

