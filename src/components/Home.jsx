
import {Link} from 'react-router';
import Header from './Header.jsx';

export default class Home extends React.Component {

  render() {
    return (
      <div className="container">
        <Header />

        <div className="row">
          <div className="col s12">

            <p className="lead">jasndkjasdjkas nsjk dnsa jdnasjknas jkns adjknas dkjn sadjk</p>
            <Link to="login">
              <i className="material-icons">add</i>
            </Link>

          </div>
        </div>

      </div>
    );
  }

};
