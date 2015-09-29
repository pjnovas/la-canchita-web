
import _ from "lodash";

import { Row, Col, Label } from "react-bootstrap";
import { Avatar, Icon } from "../controls";

export default class Attendee extends React.Component {

  constructor(props) {
    super(props);
    this.state = _.cloneDeep(Attendee.defaultState);
  }

  openMeeting() {
    window.app.router.transitionTo("meeting", { meetingId: this.props.model.id });
  }

  render() {
    let model = this.props.model;
    let time = moment(model.createdAt).from();

    let pf = {
      p1: __["priority_" + model.user.priority],
      p2: __["priority_" + model.user.priority2],
      p3: __["priority_" + model.user.priority3],
      lg: __["legs_" + model.user.leg]
    };

    return (
      <div className="list-group-item">
        <Row>

          <Col xs={2} sm={1} className="avatar-col">
            <Avatar src={model.user.picture} />
          </Col>

          <Col xs={10} sm={11}>
            <h4 className="list-group-item-heading">{model.user.name}</h4>
            { this.state.showAllPriors ?
            <p className="ellipsis">{pf.p1} &gt; {pf.p2} &gt; {pf.p3} ({pf.lg})</p>
            :
            <p className="ellipsis">{pf.p1} <a onClick={()=>this.setState({showAllPriors: true})}>+</a> ({pf.lg})</p>
            }
          </Col>

          {model.isConfirmed ?
          <div className="right-icon"><Icon name="check" /></div>
          : null }

          <Label className="timestamp" bsSize="medium" bsStyle="info">{time}</Label>

        </Row>
      </div>
    );
  }

};

Attendee.displayName = "Attendee";
Attendee.defaultState = {
  showAllPriors: false
};
