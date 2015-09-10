
import { Grid, Row, Col } from "react-bootstrap";
import { ActionButton, GMap } from "../controls";

export default class MeetingMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = MeetingMap.defaultState;
  }

  componentDidUpdate(){
    // hack to make gmap render
    window.setTimeout(() => this.refs.gmap.markPlace(), 100);
  }

  render() {
    let meeting = this.props.meeting;

    let label = meeting.place.replace(" ", ",");
    let loc = meeting.location;
    let link = "http://maps.google.com/maps/dir//" + label + "/@" + loc[0] + "," + loc[1] + ",17z";

    return (
      <Grid className="meeting-map">
        <Row>
          <Col xs={12} sm={12} md={10} mdOffset={1} className="map-section">
            <GMap ref="gmap" readOnly={true}
              place={meeting.place}
              location={meeting.location} />
          </Col>
        </Row>
        <ActionButton bsStyle="primary" icon="location-arrow"
          href={link} target="_blank"/>
      </Grid>
    );
  }

};

MeetingMap.displayName = "MeetingMap";
MeetingMap.defaultState = {

};
