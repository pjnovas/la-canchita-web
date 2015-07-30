
import { Link } from 'react-router';
import { AppBar } from 'material-ui';

export default class Header extends React.Component {

  render() {
    var profilePic = window.user ? window.user.picture : '';

    return (
      // docs: http://material-ui.com/#/components/appbar
      <AppBar showMenuIconButton={false} title="la canchita" />
    );

    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">

            {(this.props.backto ?
              <Link className="left button-collapse"
                to={this.props.backto}
                params={this.props.backparams}>
                <i className="material-icons">arrow_back</i>
              </Link>
            : '' )}

            <a className="brand-logo center">app-logo</a>

            <a href="#" data-activates="mobile" className="right hide-on-med-and-up button-collapse" ref="collapse">
              <i className="material-icons">menu</i>
            </a>

            <ul className="right hide-on-small-only">

              {this.props.navs && this.props.navs.map((nav) => {
                return(
                  <li>
                    <Link to={nav.to} params={nav.params}>
                      <i className="material-icons ">{nav.icon}</i>
                    </Link>
                  </li>
                );
              })}

              {(this.props.hideprofile ? '' :
                <li className="profile-item">
                  <Link to="profile">
                    <img className="circle profile" src={profilePic} />
                  </Link>
                </li>
              )}
            </ul>

            <ul className="side-nav" id="mobile">
              {this.props.navs && this.props.navs.map((nav) => {
                return(
                  <li>
                    <Link to={nav.to} params={nav.params}>{nav.text}</Link>
                  </li>
                );
              })}

              {(this.props.hideprofile ? '' :
                <li>
                  <Link className="profile-item" to="profile">
                    <img className="circle profile" src={profilePic} /> Profile
                  </Link>
                </li>
              )}
            </ul>

          </div>
        </nav>
      </div>
    );

  }

};
/*
<div className="title">
  <h1>{this.props.title}</h1>
</div>
*/
