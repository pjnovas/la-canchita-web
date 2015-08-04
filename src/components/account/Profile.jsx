
import UserStore from "../../stores/User";
import UserActions from "../../actions/User";

import ReactListener from "../ReactListener";

import Header from "../Header.jsx";
import {Paper, TextField, FontIcon, RaisedButton, FlatButton } from "material-ui";

//TODO: change avatar with
// http://dropsofserenity.github.io/react-avatar-cropper/

export default class Profile extends ReactListener {

  constructor(props) {
    super(props);

    this.state = {};
    this.store = UserStore;

    this.state.showChangePassword = false;
  }

  redirect(){
    window.app.router.transitionTo("groups");
  }

  componentDidMount() {
    super.componentDidMount();
    UserActions.findMe();
  }

  onFindme(me) {
    super.onFind();
    this.setState(me);
  }

  onUpdateme(me) {
    window.user = me;
    this.redirect();
  }

  onClickChangePassword(e){
    this.setState({ showChangePassword: !this.state.showChangePassword });
  }

  changeName(e) {
    this.props.onChange({ name: e.target.value });
  }

  changeEmail(e) {
    this.props.onChange({ email: e.target.value });
  }

  onCancel() {
    this.redirect();
  }

  onSave(){
    UserActions.updateMe({
      name: this.state.name
    });
  }

  render() {
    let css = Theme.css;
    let iconcss = Theme.merge("raisedButtonLink", "right");

    let passports = this.state.passports || [];

    let hasPassword = false;
    if (passports) {
      hasPassword = passports.indexOf('local') > -1 ? true : false;
    }

    let uris = {
      twitter: "https://twitter.com/",
      facebook: "https://www.facebook.com/",
      google: "https://www.google.com.ar"
    };

    return (
      <div>
        <Header backto="groups" hideprofile={true} />
        <Paper zDepth={1} rounded={true} style={css.form}>

          <h1 style={{float: "left"}}>{__.profile_title}</h1>
          <span className="profile-username" title={__.account_user}>{this.state.username}</span>
          <div className="divider"></div>

          <div className="profile-picture">
            <img src={this.state.picture} />
          </div>

          <TextField floatingLabelText={__.account_displayName}
            fullWidth={true}
            hintText={__.account_displayName_hint}
            onChange={e => { this.changeName(e); }}
            value={this.state.name} />

          <TextField floatingLabelText={__.account_email}
            fullWidth={true}
            hintText={__.account_email_hint}
            onChange={e => { this.changeEmail(e); }}
            value={this.state.email} />

          <div className="profile-change-password">
            <h3 onClick={ e => { this.onClickChangePassword(e); }} style={{cursor: "pointer"}}>
              { this.state.showChangePassword ?
                <FontIcon className="material-icons">expand_less</FontIcon>
                :
                <FontIcon className="material-icons">expand_more</FontIcon>
              }
              {__.account_password_change}
            </h3>
          { this.state.showChangePassword ?
          <div>
            { hasPassword ?
            <div>
              <TextField floatingLabelText={__.account_password_actual}
                fullWidth={true} type="password"
                onChange={e => { this.changeActualPassword(e); }} />

              <TextField floatingLabelText={__.account_password_new}
                fullWidth={true} type="password"
                onChange={e => { this.changeNewPasword(e); }}/>

              <TextField floatingLabelText={__.account_password_new_re}
                fullWidth={true} type="password"
                onChange={e => { this.changeNewPaswordRe(e); }}/>
            </div>
            :
              <div className="profile-change-password-social">
                <span>{__.account_no_password_msg}</span>
                { passports.map( passport => {
                  return (
                    <FlatButton key={passport} linkButton={true} target="_blank" href={uris[passport]}
                      style={css[passport]} secondary={true}>

                      <FontIcon className={"icon icon-" + passport}></FontIcon>
                    </FlatButton>
                  );
                })}
              </div>
            }

          </div> : null }
          </div>

          <div style={css.buttonsSection}>
            <FlatButton label={__.cancel} default={true} linkButton={true}
              onClick={ e => { this.onCancel(e); } } style={css.left}>
            </FlatButton>

            <RaisedButton primary={true} label={__.save} style={css.right}
              onClick={ e => { this.onSave(e); } }>
              <FontIcon className="material-icons" style={iconcss}>check</FontIcon>
            </RaisedButton>
          </div>

        </Paper>
      </div>
    );
  }

}
