
import { Row, Col, Label } from "react-bootstrap";
import { Icon } from "../controls";

export default class MeetingItem extends React.Component {

  constructor(props){
    super(props);

    this.editors = ["owner", "admin"];
    this.destroyers = ["owner"];
  }

  openMeeting() {
    window.app.router.transitionTo("meeting", { meetingId: this.props.model.id });
  }

  navigateEdit(e){
    e.stopPropagation();
    window.app.router.transitionTo("meetingedit", { meetingId: this.props.model.id });
  }

  onRemoveClick(e){
    e.stopPropagation();
    this.props.removeMeeting(this.props.model.id);
  }

  render() {
    let model = this.props.model;
    let time = moment(model.when).from();
    let title = model.title || __.meeting_default_title;
    let place = model.place; //model.place.split(',')[0];
    let rightIconMenu;

    let myRole = this.props.myRole;
    let canEdit = this.editors.indexOf(myRole) > -1;
    let canDestroy = this.destroyers.indexOf(myRole) > -1;

    return (
      <div className="list-group-item" onClick={ e => { this.openMeeting(e); }} >

        <Row>

          <Col xs={11}>
            <h4 className="list-group-item-heading">{title}</h4>
            <p className="ellipsis">{place}</p>
          </Col>

          <Label className="timestamp" bsSize="medium" bsStyle="info">{time}</Label>

          {!this.props.hideActions ?
          <div className="btn-group">

            <button type="button" className="btn btn-default dropdown-toggle"
              data-toggle="dropdown" onClick={ e => { e.stopPropagation(); }}>
              <Icon name="ellipsis-v" />
            </button>

            <ul className="dropdown-menu dropdown-menu-right">
              { canEdit ?
              <li><a onClick={ e => { this.navigateEdit(e); }}>{__.edit}</a></li>
              : null }
              { canDestroy ?
              <li><a onClick={ e => { this.onRemoveClick(e);  }}>{__.remove}</a></li>
              : null }
            </ul>
          </div>
          : null }
        </Row>

      </div>
    );
  }

};

MeetingItem.displayName = "MeetingItem";
