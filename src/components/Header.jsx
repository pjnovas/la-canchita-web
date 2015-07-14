
import {Link} from 'react-router';

export default class Header extends React.Component {

  render() {
    var profilePic = window.user ? window.user.picture : '';

    return (
      <div className="row">

        {(this.props.backto ?
        <Link className="mdl-navigation__link go-back" to={this.props.backto}>
          <i className="fa fa-reply"></i>
        </Link>
        : '' )}


        {(this.props.hideprofile ? '' :
        <Link className="mdl-navigation__link profile" to="profile">
          <img src={profilePic} />
        </Link>
        )}

        {this.props.navs && this.props.navs.map((nav) => {
          return(
            <Link className="mdl-navigation__link" to={nav.to} params={nav.params}>
              <i className={"fa " + nav.icon}></i>
            </Link>
          );
        })}

      </div>
    );

  }

};
/*
<div className="title">
  <h1>{this.props.title}</h1>
</div>
*/