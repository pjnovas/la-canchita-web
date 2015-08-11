
import MeetingStore from "../../stores/Meeting";
import MeetingActions from "../../actions/Meeting";

import MeetingItem from "./Item.jsx";

import ReactListener from "../ReactListener";

import { Row, Col, ListGroup } from "react-bootstrap";
import { ActionButton } from "../controls";

export default class MeetingList extends ReactListener {

  constructor(props) {
    super(props);

    this.state.gid = this.props.groupId;
    this.state.meetings = [];

    this.store = MeetingStore;
    this.editors = ["owner", "admin"];
  }

  componentDidMount() {
    super.componentDidMount();
    MeetingActions.find(this.state.gid);
  }

  onFind(meetings) {
    super.onFind();
    this.setState({ meetings });
  }

  render() {
    var list = this.state.meetings;

    list.sort(function(a, b) {
      a = moment(a.when);
      b = moment(b.when);
      return b>a ? -1 : b<a ? 1 : 0;
    });

    var active = list.filter( meeting => {
      return moment(meeting.when) >= moment();
    });

    var past = list.filter( meeting => {
      return moment(meeting.when) < moment();
    });


    var canCreate = true; //this.editors.indexOf(myRole) > -1;

    return (
      <Row>
        <Col xs={12}>

          <ListGroup>
            {active.map(meeting => {
              return (<MeetingItem key={meeting.id} model={meeting}/>);
            })}
          </ListGroup>

          { past.length ?
          <div>
            <h4>{__.meeting_past}</h4>
            <ListGroup>
              {past.map(meeting => {
                return (<MeetingItem key={meeting.id} model={meeting} />);
              })}
            </ListGroup>
          </div>
          : null }

          { canCreate ?
            <ActionButton bsStyle="primary" icon="plus"
              to="meetingnew" params={{groupId: this.state.gid}}/>
          : null }

        </Col>
      </Row>
    );
  }

};

MeetingList.displayName = "MeetingList";
