
import { Row, Col, Panel } from "react-bootstrap";
import Icon from "./Icon";

export default class Card extends React.Component {

  render() {
    let media;

    if (this.props.media === true){
      media = {
        backgroundColor: "#3F4C3E"
      };
    }
    else if (this.props.media){
      media = {
        backgroundImage: "url(" + this.props.media + ")"
      };
    }

    return (
      <Row>
        <Col xs={12} className="card">

          { this.props.htitle ?

            <div className="header">

              <div className="icon-ctn">
                <div className="avatar icon">
                  <Icon name={this.props.hicon} />
                </div>
              </div>

              <div className="content">
                <h2>{this.props.htitle}</h2>
                <h3>{this.props.hsubtitle}</h3>
              </div>

            </div>

          : null }

          { media ?
            <Row>
              <Col xs={12} className="media" style={media}>
              { !this.props.useHeader && this.props.title ?
                <h2 className="title">{this.props.title}</h2>
              : null }
              </Col>
            </Row>
          : null }

          { this.props.description ?
            <Row>
              <Col xs={12}>
                <div className="body">
                  {this.props.description}
                </div>
              </Col>
            </Row>
          : null }

          { this.props.actions && this.props.actions.length ?
            <Row>
              <Col xs={12} className="actions">
                {this.props.actions.map( action => { return action; })}
              </Col>
            </Row>
          : null }

        </Col>
      </Row>
    );
  }

};

Card.displayName = "Card";
