
import { Input, Button, Row, Col } from "react-bootstrap";
import Errors from "./Errors.jsx";

export default class Recover extends React.Component {

  render() {

    return (
      <form action={this.props.uri} method="post">

        <Row>
          <Col xs={12}>
            <h3>{__.account_recover_title}</h3>
          </Col>
        </Row>

        <Row>
          <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
            <Input type="email" placeholder={__.account_email} name="email"/>
          </Col>
        </Row>

        <Errors errors={this.props.errors} />

        <Row>
          <Col xs={10} xsOffset={1} sm={6} smOffset={3}>

            <Button bsStyle="link" onClick={ e => {this.props.onBack(e); } }>
              {__.back}
            </Button>

            <Button bsStyle="success" className="pull-right" type="submit">
              {__.send}
            </Button>

          </Col>
        </Row>

      </form>

    );
  }

}
