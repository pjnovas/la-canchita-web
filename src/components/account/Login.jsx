import _ from "lodash";

import { Button, Grid, Row, Col } from "react-bootstrap";
import { Icon, Paper, Divider } from "../controls";
import { Manual, Recover, Register } from "./forms";

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = _.cloneDeep(Login.defaultState);

    this.state.manual = (window.location.pathname === "/login" ? true : false);
    this.state.recover = (window.location.pathname === "/recover" ? true : false);
    this.state.register = (window.location.pathname === "/register" ? true : false);
  }

  onClickSocial(){
    this.setState({
      social: true,
      manual: true,
      register: false,
      recover: false,
      errors: []
    });
  }

  onClickManual(){
    this.setState({
      social: false,
      manual: true,
      register: false,
      recover: false,
      errors: []
    });
  }

  onClickRegister(){
    this.setState({
      social: false,
      manual: false,
      register: true,
      recover: false,
      errors: []
    });
  }

  onClickRecover(){
    this.setState({
      social: false,
      manual: false,
      register: false,
      recover: true,
      errors: []
    });
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

    if (window.redirect){
      for (let p in uris){
        uris[p] += "?redirect=" + window.redirect;
      }
    }

    return (
      <Grid>
        <Paper className="col-lg-6 col-lg-offset-3">

          <h1>{__.app_title}</h1>
          <Divider />

          { this.state.social ?

          <Row>

            <Col xs={12}>
              <h3>{__.account_title_social}</h3>
            </Col>

            <Col xs={12}>

              <div className="text-center">
                <Button href={uris.twitter} className="btn-social twitter">
                  <Icon name="twitter" />
                </Button>

                <Button href={uris.facebook} className="btn-social facebook">
                  <Icon name="facebook" />
                </Button>

                <Button href={uris.google} className="btn-social google">
                  <Icon name="google" />
                </Button>
              </div>

            </Col>
          </Row>

          :

          <Row>
            <Col xs={12}>
              <h3>{__.account_title_social_1}
                <Button bsStyle="link" onClick={ e => { this.onClickSocial(e); }} >
                  {__.account_title_social_2}
                </Button>
              </h3>
            </Col>
          </Row>

          }

          <Divider />

          <Row>
            <Col xs={12}>

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

            </Col>
          </Row>

        </Paper>
      </Grid>
    );
  }

};

Login.displayName = "Login";
Login.defaultState = {
  social: true,
  manual: false,
  recover: false,
  register: false,
  redirect: window.redirect,
  errors: window.errors
};
