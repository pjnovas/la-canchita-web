
import MemberStore from "../../stores/Member";

import { Row, Col, ListGroupItem, DropdownButton, MenuItem } from "react-bootstrap";
import { Avatar, Icon } from "../controls";

export default class MemberItem extends React.Component {

  constructor(props) {
    super(props);

    this.roles = ["owner", "admin", "moderator", "member"];

    this.roleName = {
      "owner": __.member_role_owner,
      "admin": __.member_role_admin,
      "moderator": __.member_role_moderator,
      "member": __.member_role_member
    };

    this.kickers = ["owner", "admin"];
  }

  render() {
    let model = this.props.model;
    let myRole = this.props.myRole || "member";

    let isMe = (model.user.id == window.user.id);
    let myRoleIdx = this.roles.indexOf(myRole);
    let mRoleIdx = this.roles.indexOf(model.role);

    let canKick = false;
    if (!isMe && this.kickers.indexOf(myRole) > -1){
      canKick = this.roles.indexOf(model.role) > myRoleIdx;
    }

    let changeRoles = this.roles.filter( role => {
      return (
        model.role !== role &&
        mRoleIdx > myRoleIdx &&
        this.roles.indexOf(role) > myRoleIdx
      );
    });

    let roleDDL = "roles-ddl-" + model.id;
    let roleName = this.roleName[model.role];

    let iconButtonElement = null;
    let rightIconMenu = null;

    if (!isMe && myRole !== "member" && changeRoles.length) {

      rightIconMenu = (
        <DropdownButton title={<Icon name="ellipsis-v" />} noCaret pullRight className="btn-icon">

          <MenuItem header>{__.member_change_role}</MenuItem>

          { changeRoles.map( role => {
            return (<MenuItem eventKey={role}
              onClick={ () => { this.props.changeRole(model.id, role); }} >
                { this.roleName[role] }</MenuItem>)
          }) }

          { canKick ? <MenuItem divider /> : <MenuItem></MenuItem> }
          { canKick ? <MenuItem onClick={ e => { this.props.kickMember(model.id); } } >
              {__.remove}</MenuItem> : <MenuItem></MenuItem> }

        </DropdownButton>
      );

    }

    return (
      <ListGroupItem className="row">
        <Col xs={2} sm={1}>
          <Avatar src={model.user.picture} />
        </Col>
        <Col xs={8} sm={10}>
          <h3>{model.user.name}</h3>
          <p>{roleName}</p>
        </Col>
        <Col xs={2} sm={1}>
          {rightIconMenu}
        </Col>
      </ListGroupItem>
    );
  }

};

MemberItem.displayName = "MemberItem";
