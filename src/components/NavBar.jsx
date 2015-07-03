
import {Navbar, Nav} from 'react-bootstrap';
import {NavItemLink, ButtonLink} from 'react-router-bootstrap';

export default class NavBar extends React.Component {

  render() {

    if (!window.user){
      return (
        <div>
          <ButtonLink to="login" className="pull-right">Ingresar</ButtonLink>
        </div>
      );
    }

    return (
      <nav>
        <ul className="nav masthead-nav">
          <li>
            <NavItemLink to="home">Grupos</NavItemLink>
          </li>
          <li><a href="#">Partidos</a></li>
          <li><a href="#">Config</a></li>
        </ul>
      </nav>
    );
  }

};

