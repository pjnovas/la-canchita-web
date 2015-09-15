
import { Row, Col } from "react-bootstrap";

export default class Errors extends React.Component {

  render() {

    if (!this.props.errors || !this.props.errors.length){
      return (null);
    }

    return (
      <Row className="account-errors">
        <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
          { this.props.errors ?
            this.props.errors.map( err => {
              return (
                <p key={err} className="bg-danger">{__[err]}</p>
              );
            })
            : null }
        </Col>
      </Row>
    );
  }

};

Errors.displayName = "Errors";
