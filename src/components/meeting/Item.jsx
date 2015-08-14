
import { ListGroupItem, Label, DropdownButton, MenuItem } from "react-bootstrap";
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

    if (!this.props.hideActions){
      let myRole = this.props.myRole;
      let canEdit = this.editors.indexOf(myRole) > -1;
      let canDestroy = this.destroyers.indexOf(myRole) > -1;

      if (canEdit || canDestroy) {

        rightIconMenu = (
          <DropdownButton title={<Icon name="ellipsis-v" />} noCaret pullRight
            className="btn-icon" onClick={ e => { e.stopPropagation(); }}>
          { canEdit ?
            <MenuItem key="remove" onClick={ e => { this.navigateEdit(e); }}>
              {__.edit}
            </MenuItem>
          : null }
          { canDestroy ?
            <MenuItem key="edit" onClick={ e => { this.onRemoveClick(e);  }}>
              {__.remove}
            </MenuItem>
          : null }
          </DropdownButton>
        );

      }
    }

    return (
      <ListGroupItem header={title} href="#" onClick={ e => { this.openMeeting(e); }} >
        {__.meeting_at} {place}
        {rightIconMenu}
        <Label className="pull-right" bsSize="medium" bsStyle="info">{time}</Label>
      </ListGroupItem>
    );
  }

};

MeetingItem.displayName = "MeetingItem";
