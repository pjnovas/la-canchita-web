
import { Input, Button, Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Icon } from "../controls";

export default class Manual extends React.Component {

  render() {

    let recoverBtn = (
      <OverlayTrigger placement='top' overlay={<Tooltip>{__.account_recover_info}</Tooltip>}>
        <Button onClick={ e => {this.props.onRecover(e); }}>
          <Icon name="refresh" />
        </Button>
      </OverlayTrigger>
    );

    return (
      <form action={this.props.uri} method="post">

        <Row>
          <Col xs={12}>
            <h3>{__.account_title_manual}</h3>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            { this.props.errors ?
              this.props.errors.map( err => {
                return (
                  <p>{err}</p>
                );
              })
              : null }
          </Col>
        </Row>

        <Row>
          <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
            <Input type="text" placeholder={__.account_identifier} name="identifier"/>
          </Col>
        </Row>

        <Row>

          <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
            <Input type="password" placeholder={__.account_password} name="password"
              buttonAfter={recoverBtn} />
          </Col>
        </Row>

        <Row>
          <Col xs={10} xsOffset={1} sm={6} smOffset={3}>

            <Button bsStyle="primary" onClick={ e => {this.props.onRegister(e); } }>
              {__.account_signin}
            </Button>

            <Button bsStyle="success" className="pull-right" type="submit">
              {__.account_login}
            </Button>

          </Col>
        </Row>

      </form>
    );
  }

}
