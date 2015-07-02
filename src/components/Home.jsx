
import {Navbar, Nav, ListGroup} from 'react-bootstrap';
import {NavItemLink, ButtonLink, ListGroupItemLink} from 'react-router-bootstrap';

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <div className="masthead clearfix">
          <div className="inner">
            <h3 className="masthead-brand">name-app</h3>
            <nav>
              <ul className="nav masthead-nav">
                <li>
                  <NavItemLink to="home">home</NavItemLink>
                </li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </nav>
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

