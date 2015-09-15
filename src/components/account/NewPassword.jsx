
import _ from "lodash";
import { Input, Button, Grid, Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Divider, Paper } from "../controls";
import Errors from "./Errors.jsx";

export default class NewPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = _.cloneDeep(NewPassword.defaultState);
    this.state.token = this.props.params.token;
  }

  changeNewPasword(e) {
    this.setState({ password: e.target.value });
  }

  changeNewPaswordRe(e) {
    this.setState({ cPassword: e.target.value });
  }

  render() {

    return (
      <Grid>
        <Paper className="col-lg-6 col-lg-offset-3">

          <h1>{__.account_newpassword_title}</h1>
          <Divider />
          <form action={"/v/newpassword/" + this.state.token} method="post">

            <Row>
              <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
                <Input type="password" label={__.account_password_new}
                  onChange={ e => this.changeNewPasword(e) }
                  name="password" value={this.state.password}/>

                <Input type="password" label={__.account_password_new_re}
                  onChange={ e => this.changeNewPaswordRe(e) }
                  name="cpassword" value={this.state.cPassword} />
              </Col>

            </Row>

            <Errors errors={window.errors} />

            <Row>
              <Col xs={10} xsOffset={1} sm={6} smOffset={3}>

                <Button bsStyle="success" className="pull-right" type="submit">
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

NewPassword.displayName = "NewPassword";
NewPassword.defaultState = {
  pasword: "",
  cPassword: ""
};
