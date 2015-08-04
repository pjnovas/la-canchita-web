
import { Button, Grid, Row, Col } from "react-bootstrap";
import { Icon, Paper, Divider } from "../controls";
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

    return (
      <Grid>
        <Paper>

          <form>

            <h1>{__.app_title}</h1>
            <Divider />

            { this.state.social ?

            <Row>

              <Col xs={12}>
                <h3>{__.account_title_social}</h3>
              </Col>

              <Col xs={8} xsOffset={2} md={6} mdOffset={3}>

                <Row>
                  <Col xs={4} className="text-center">
                    <Button href={uris.twitter} className="btn-social twitter">
                      <Icon name="twitter" />
                    </Button>
                  </Col>

                  <Col xs={4} className="text-center">
                    <Button href={uris.facebook} className="btn-social facebook">
                      <Icon name="facebook" />
                    </Button>
                  </Col>

                  <Col xs={4} className="text-center">
                    <Button href={uris.google} className="btn-social google">
                      <Icon name="google" />
                    </Button>
                  </Col>
                </Row>

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

            { this.state.social ?
              <Row>
                <Col xs={12}>
                  <h3>{__.account_title_manual_1}
                    <Button bsStyle="link" onClick={ e => { this.onClickManual(e); }} >
                      {__.account_title_manual_2}
                    </Button>
                  </h3>
                </Col>
              </Row>
              : null }

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

          </form>

        </Paper>
      </Grid>
    );
  }

};
