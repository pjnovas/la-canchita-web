
import { Row, Col } from "react-bootstrap";

export default class Paper extends React.Component {

  render() {
    var spacer = this.props.hasOwnProperty("skipHeader") ? "header-spacer " : "";
    var css = "paper " + spacer + (this.props.className || "");

    return (
      <Row className="paper-ctn">
        <Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2} className={css}>
          {this.props.children}
        </Col>
      </Row>
    );
  }

};

Paper.displayName = "Paper";
