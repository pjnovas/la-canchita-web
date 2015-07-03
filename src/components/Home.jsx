
import NavBar from './NavBar.jsx';
import {ButtonLink} from 'react-router-bootstrap';

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <div className="masthead clearfix">
          <div className="inner">
            <h3 className="masthead-brand">name-app</h3>
            <NavBar />
          </div>
        </div>
        <div className="inner cover">
          <p className="lead">jasndkjasdjkas nsjk dnsa jdnasjknas jkns adjknas dkjn sadjk</p>
          <ButtonLink to="login" className="btn-lg">Ingresar</ButtonLink>
        </div>
      </div>
    );
  }

};

