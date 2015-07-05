
import NavBar from './NavBar.jsx';
import {ButtonLink} from 'react-router-bootstrap';

import Header from './Header.jsx';

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <Header />

        <div className="inner home">
          <p className="lead">jasndkjasdjkas nsjk dnsa jdnasjknas jkns adjknas dkjn sadjk</p>
          <ButtonLink to="login" className="btn-lg">Ingresar</ButtonLink>
        </div>
      </div>
    );
  }

};

