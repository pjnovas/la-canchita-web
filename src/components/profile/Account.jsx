
import _ from "lodash";

import { UserActions } from "../../actions";

import { Grid, Input, Button, Row, Col } from "react-bootstrap";
import { Paper, Icon, Divider } from "../controls";

export default class ProfileAccount extends React.Component {

  constructor(props) {
    super(props);
    this.state = _.cloneDeep(ProfileAccount.defaultState);
  }

  onClickChangePassword(e){
    this.setState({ showChangePassword: !this.state.showChangePassword });
  }

  changeName(e) {
    this.props.onChange("name", e.target.value);
  }

  changeEmail(e) {
    this.props.onChange("email", e.target.value);
  }

  changeActualPassword(e) {
    this.setState({ "actualPassword": e.target.value });
    this.toggleSavePassword();
  }

  changeNewPasword(e) {
    this.setState({ "newPassword": e.target.value });
    this.toggleSavePassword();
  }

  changeNewPaswordRe(e) {
    this.setState({ "cNewPassword": e.target.value });
    this.toggleSavePassword();
  }

  toggleSavePassword() {
    if (this.state.actualPassword.length && this.state.newPassword.length && this.state.cNewPassword.length){
      this.setState({ showSavePassword: true });
      return;
    }

    this.setState({ showSavePassword: false });
  }

  onSavePasword() {
    let actualPassword = this.state.actualPassword,
      newPassword = this.state.newPassword,
      cNewPassword = this.state.cNewPassword;

    if (newPassword !== cNewPassword){
      this.setState({ newPasswordError: __["Error.Passport.Password.NotMatch"] });
      return;
    }

    UserActions.changePassword(actualPassword, newPassword);
    this.setState(_.cloneDeep(ProfileAccount.defaultState));
  }

  onSave() {
    let model = this.props.model;

    UserActions.updateMe({
      name: model.name,
      email: model.email
    });
  }

  render() {
    let model = this.props.model;
    let passports = model.passports || [];

    let hasPassword = false;
    let hasSocial = false;

    if (passports) {
      hasPassword = passports.indexOf("local") > -1 ? true : false;

      let social = ["twitter", "facebook", "google"];
      passports.forEach( passport => {
        if (social.indexOf(passport) >-1){
          hasSocial = true;
        }
      });
    }

    let uris = {
      twitter: "https://twitter.com/",
      facebook: "https://www.facebook.com/",
      google: "https://www.google.com.ar"
    };

    return (
      <Grid className="profile">
        <Paper skipHeader>
          <form>

            <Row>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>

                <div className="picture">
                  <img src={model.picture} />
                </div>

              </Col>
            </Row>

            <Row>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>

                <Input type="text" label={__.account_displayName}
                  placeholder={__.account_displayName_hint}
                  onChange={e => { this.changeName(e); }}
                  value={model.name} />

              </Col>
            </Row>

            <Row>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>

                <Input type="text" label={__.account_email}
                  placeholder={__.profile_email_hint}
                  onChange={e => { this.changeEmail(e); }}
                  value={model.email} />

              </Col>
            </Row>

            <Divider />

            <Row>

              <Col xs={10} xsOffset={1} sm={8} smOffset={2} className="change-password">

                <h4 onClick={ () =>this.onClickChangePassword() }>
                  { this.state.showChangePassword ?
                    <Icon name="caret-up" />
                    :
                    <Icon name="caret-down" />
                  }
                  {__.account_password_change}
                </h4>

                { this.state.showChangePassword ?
                <div>
                  { hasPassword ?
                  <div>
                    <Input type="password" label={__.account_password_actual}
                      onChange={ e => this.changeActualPassword(e) } />

                    <Input type="password" label={__.account_password_new}
                      onChange={ e => this.changeNewPasword(e) } />

                    <Input type="password" label={__.account_password_new_re}
                      onChange={ e => this.changeNewPaswordRe(e) } />

                    { this.state.newPasswordError ?
                    <p className="bg-danger">{this.state.newPasswordError}</p>
                    : null }

                    { this.state.showSavePassword ?
                    <Button bsStyle="success" onClick={ () => this.onSavePasword() } className="pull-right">
                      {__.account_save_password}
                    </Button>
                    : null }
                  </div>
                  : null }

                  { hasSocial ?
                    <div className="password-social">
                      <p>{__.account_no_password_msg}</p>
                      { passports.map( passport => {
                        if (passport === "local") return(null);
                        return (
                          <Button key={passport} target="_blank" href={uris[passport]}
                            className={"btn-social " + passport}>
                            <Icon name={passport} />
                          </Button>
                        );
                      })}
                    </div>
                  : null }

                </div> : null }
              </Col>
            </Row>

            <Divider />

            <Row>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>

                <Button bsStyle="success" onClick={ () => this.onSave() } className="pull-right">
                  {__.save}
                </Button>

              </Col>
            </Row>

          </form>
        </Paper>
      </Grid>
    );
  }
}

ProfileAccount.displayName = "ProfileAccount";
ProfileAccount.defaultState = {
  showChangePassword: false,
  actualPassword: "",
  newPassword: "",
  cNewPassword: "",
  showSavePassword: false,
  newPasswordError: ""
};
