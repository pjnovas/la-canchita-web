
import { Paper, ClearFix, FlatButton, RaisedButton, FontIcon } from "material-ui";
import { Manual, Recover, Register } from "./forms";

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      initial: true,
      social: true,
      manual: false,
      recover: false,
      register: false
    };

    if (window.redirect){
      this.state.redirect = window.redirect;
    }

    switch (window.location.pathname){
      case "/register":
        this.state.initial = false;
        this.state.social = false;
        this.state.register = true;
      break;
      case "/recover":
        this.state.initial = false;
        this.state.social = false;
        this.state.recover = true;
      break;
    }

    if (window.errors && window.errors.length){
      this.state.errors = window.errors;

      if (window.location.pathname === "/login"){
        this.state.initial = false;
        this.state.social = false;
        this.state.manual = true;
      }
    }
  }

  onClickSocial(){
    this.setState({ initial: false, social: true, manual: false, register: false, recover: false, errors: [] });
  }

  onClickManual(){
    this.setState({ initial: false, social: false, manual: true, register: false, recover: false, errors: [] });
  }

  onClickRegister(){
    this.setState({ social: false, manual: false, register: true, recover: false, errors: [] });
  }

  onClickRecover(){
    this.setState({ social: false, manual: false, register: false, recover: true, errors: [] });
  }

  render() {

    let uris = {
      manual: "/auth/local",
      register: "/auth/local/register",
      recover: "/auth/local/recover",

      twitter: "/auth/twitter",
      facebook: "/auth/facebook",
      google: "/auth/google"
    };

    if (this.state.redirect){
      for (let p in uris){
        uris[p] += "?redirect=" + this.state.redirect;
      }
    }

    let sicon = { color: "#fff" };
    let social = {
      padding: "10px 0",
      margin: "10px"
    };

    let tw = Theme.merge(social, { backgroundColor: "#00aced" });
    let fb = Theme.merge(social, { backgroundColor: "#3b5998" });
    let gl = Theme.merge(social, { backgroundColor: "#dd4b39" });

    let paperBg = Theme.pick(Theme.components.paper, ["backgroundColor"]);
    let flat = Theme.merge(paperBg, { display: "inline-table" });

    return (
      <Paper zDepth={1} rounded={true} style={Theme.css.form}>
        <h1>{__.app_title}</h1>
        <div className="divider"></div>

        { this.state.social ?

        <ClearFix>

          <h3>{__.account_title_social}</h3>

          <FlatButton linkButton={true} href={uris.twitter} style={tw}
            secondary={true}>
            <FontIcon className="icon icon-twitter" style={sicon}></FontIcon>
          </FlatButton>

          <FlatButton linkButton={true} href={uris.facebook} style={fb}
            secondary={true}>
            <FontIcon className="icon icon-facebook" style={sicon}></FontIcon>
          </FlatButton>

          <FlatButton linkButton={true} href={uris.google} style={gl}
            secondary={true}>
            <FontIcon className="icon icon-google" style={sicon}></FontIcon>
          </FlatButton>

        </ClearFix>
        :
        <h3>{__.account_title_social_1}
          <FlatButton linkButton={true} secondary={true} label={__.account_title_social_2}
            onClick={ e => { this.onClickSocial(e); }} style={flat} >
          </FlatButton>
        </h3>
        }

        <div className="divider"></div>

        { this.state.social ?
          <h3>{__.account_title_manual_1}
            <FlatButton linkButton={true} secondary={true} label={__.account_title_manual_2}
              onClick={ e => { this.onClickManual(e); }} style={flat} >
            </FlatButton>
          </h3>
          : null }

        { this.state.manual ?
          <Manual uri={uris.manual} errors={this.state.errors}
            onBack={ e => {this.onClickManual(e); } }
            onRecover={ e => {this.onClickRecover(e); } }
            onRegister={ e => {this.onClickRegister(e); } } /> : null }

        { this.state.register ?
          <Register uri={uris.register} errors={this.state.errors}
            onBack={ e => {this.onClickManual(e); } } /> : null }

        { this.state.recover ?
          <Recover uri={uris.recover} errors={this.state.errors}
            onBack={ e => {this.onClickManual(e); } } /> : null }

      </Paper>
    );
  }

}
