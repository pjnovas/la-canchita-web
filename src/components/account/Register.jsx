
import { Input, Button, Row, Col } from "react-bootstrap";
import Errors from "./Errors.jsx";

export default class Register extends React.Component {

  render() {

    return (
      <form action={this.props.uri} method="post">

        <Row>
          <Col xs={12}>
            <h3>{__.account_signin_title}</h3>
          </Col>
        </Row>

        <Row>
          <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
            <Input type="text" placeholder={__.account_user} name="username"/>
          </Col>
        </Row>

        <Row>
          <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
            <Input type="email" placeholder={__.account_email} name="email"/>
          </Col>
        </Row>

        <Row>
          <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
            <Input type="password" placeholder={__.account_password} name="password"/>
          </Col>
        </Row>

        <Errors errors={this.props.errors} />

        <Row>
          <Col xs={10} xsOffset={1} sm={6} smOffset={3}>

            <Button bsStyle="link" onClick={ e => {this.props.onBack(e); } }>
              {__.back}
            </Button>

            <Button bsStyle="success" className="pull-right" type="submit">
              {__.account_signin_action}
            </Button>

          </Col>
        </Row>

      </form>
    );
  }

}
