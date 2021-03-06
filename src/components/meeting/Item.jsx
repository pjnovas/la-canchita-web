
import { MeetingStore } from "../../stores";

import { Row, Col, Label } from "react-bootstrap";
import { Icon, Confirm } from "../controls";

export default class MeetingItem extends React.Component {

  constructor(props){
    super(props);

    this.editors = ["owner", "admin"];
    this.destroyers = ["owner"];

    this.state = MeetingItem.defaultState;
  }

  openMeeting() {
    window.app.router.transitionTo("meeting", { meetingId: this.props.model.id });
  }

  navigateClone(e){
    e.stopPropagation();
    window.app.router.transitionTo("meetingclone", {
      groupId: this.props.model.group,
      cloneId: this.props.model.id });
  }

  navigateEdit(e){
    e.stopPropagation();
    window.app.router.transitionTo("meetingedit", { meetingId: this.props.model.id });
  }

  onRemoveClick(e){
    e.stopPropagation();
    this.setState({ confirmDestroy: true });
  }

  render() {
    let model = this.props.model;
    let time = moment(model.when).from();
    let title = model.title || __.meeting_default_title;
    let place = model.place;
    let rightIconMenu;

    let myRole = this.props.myRole;
    let canClone = this.editors.indexOf(myRole) > -1;
    let canEdit = this.editors.indexOf(myRole) > -1;
    let canDestroy = this.destroyers.indexOf(myRole) > -1;

    let stage = MeetingStore.getStageOf(model);
    if (stage && ["cancelled", "historic", "running", "played"].indexOf(stage) > -1){
      canEdit = false;
      canDestroy = false;
    }

    // Destroy / Cancel meeting texts

    let destroyLinkText = __.remove;
    let destroyTitle = __.meeting_destroy_title;
    let destroyText = __.meeting_destroy_text;

    if (canDestroy && model.attendance > 1 || (model.attendees && model.attendees.length > 1)){
      destroyLinkText = __.cancel;
      destroyTitle = __.meeting_cancel_title;
      destroyText = __.meeting_cancel_text;
    }

    let options;
    if (canEdit || canDestroy || canClone){

      options = (
        <div className="btn-group">

          <button type="button" className="btn btn-default dropdown-toggle"
            data-toggle="dropdown" onClick={ e => { e.stopPropagation(); }}>
            <Icon name="ellipsis-v" />
          </button>

          <ul className="dropdown-menu dropdown-menu-right">
            { canEdit && !this.props.isPast ?
            <li key="edit">
              <a onClick={ e => { this.navigateEdit(e); }}>
                <Icon name="pencil" /> {__.edit}</a>
            </li>
            : null }
            { canClone ?
            <li key="clone">
              <a onClick={ e => { this.navigateClone(e); }}>
                <Icon name="clone" /> {__.meeting_clone}</a>
            </li>
            : null }
            { canDestroy && !this.props.isPast ? <li className="divider"></li> : null }
            { canDestroy && !this.props.isPast ?
            <li key="remove">
              <a className="text-danger"
                onClick={ e => { this.onRemoveClick(e); } }>
                <Icon name="close" /> {destroyLinkText}</a>
            </li>
            : null }
          </ul>
        </div>
      );

    }

    return (
      <div className="list-group-item" onClick={ e => { this.openMeeting(e); }} >

        <Row>

          <Col xs={11}>
            <h4 className="list-group-item-heading">{title}
            { model.cancelled ?  <Label className="label-danger">{__.meeting_cancelled}</Label> : "" }
            </h4>
            <p className="ellipsis">{place}</p>
          </Col>

          <Label className="timestamp" bsSize="medium" bsStyle="info">{time}</Label>
          {options}

          { this.state.confirmDestroy ?
            <Confirm title={destroyTitle.replace("{1}", model.title)}
              text={destroyText.replace("{1}", model.title)}
              onClose={ () => this.setState({ confirmDestroy: false }) }
              onAccept={ () => { this.setState({ confirmDestroy: false }); this.props.removeMeeting(model.id); } } />
          : null }

        </Row>

      </div>
    );
  }

};

MeetingItem.displayName = "MeetingItem";
MeetingItem.defaultState = {
  confirmDestroy: false
};
