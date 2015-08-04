
import { NavItemLink } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import { Icon, Avatar } from './controls';

export default class Header extends React.Component {

  render() {
    var profilePic = window.user ? window.user.picture : null;

    return (
      <Navbar fluid={true}>

      {(this.props.backto ?
        <Nav left>
          <NavItemLink to={this.props.backto} params={this.props.backparams}>
            <Icon name="twitter" />
          </NavItemLink>
        </Nav>
      : null )}

      <Nav left>
        <a className="navbar-brand">{this.props.title || __.app_title}</a>
      </Nav>

      {(this.props.hideprofile ? null :
        <Nav right>
          <NavItemLink to="profile" className="navbar-profile">
            <Avatar src={profilePic} />
          </NavItemLink>
        </Nav>
      )}

    </Navbar>
    );

  }
};
