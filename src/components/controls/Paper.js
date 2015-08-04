
import { Row, Col } from "react-bootstrap";

export default class Paper extends React.Component {

  render() {

    return (
      <Row className="paper-ctn">
        <Col xs={12} md={8} mdOffset={2} lg={6} lgOffset={3} className="paper">
          {this.props.children}
        </Col>
      </Row>
    );
  }

};

Paper.displayName = "Paper";
