
import { NavItemLink } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import { Icon, Avatar } from './controls';

export default class Header extends React.Component {

  render() {
    var profilePic = window.user ? window.user.picture : null;

    return (
      <Navbar fluid={true} fixedTop={true} className="z2">

      {(this.props.backto ?
        <ul className="nav navbar-nav navbar-left">
          <NavItemLink className="navbar-back" to={this.props.backto} params={this.props.backparams}>
            <Icon name="arrow-left" />
          </NavItemLink>
        </ul>
      : null )}

      <ul className="nav navbar-nav navbar-left">
        <li className="navbar-brand">{this.props.title || __.app_title}</li>
      </ul>

      {(this.props.hideprofile ? null :
        <ul className="nav navbar-nav navbar-right">
          <NavItemLink to="profile" className="navbar-profile">
            <Avatar src={profilePic} />
          </NavItemLink>
        </ul>
      )}

    </Navbar>
    );

  }
};
