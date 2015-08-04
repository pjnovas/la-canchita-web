
import { Link } from "react-router";
import { AppBar, IconButton, Avatar } from "material-ui";

export default class Header extends React.Component {

  render() {
    var profilePic = window.user ? window.user.picture : null;

    return (
      <AppBar zDepth={0}
        className={"app-bar " + (this.props.backto ? "": "hide-left") }
        title={this.props.title || __.app_title}

        iconElementLeft={(this.props.backto ?
          <IconButton
            linkButton={true}
            iconClassName="material-icons"
            containerElement={<Link to={this.props.backto} params={this.props.backparams} />}
          >arrow_back</IconButton>
          : null )}

        iconElementRight={(this.props.hideprofile ? null :
          <Link to="profile" className="profile-bar">
            <Avatar src={profilePic} />
          </Link>
          )}
      />
    );

  }
};