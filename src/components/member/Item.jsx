
import MemberStore from "../../stores/Member";

import { ListItem, Avatar, IconButton, FontIcon } from "material-ui";

let IconMenu = require('material-ui/lib/menus/icon-menu');
let MenuItem = require('material-ui/lib/menus/menu-item');
let MenuDivider = require('material-ui/lib/menus/menu-divider')

export default class MemberItem extends React.Component {

  constructor(props) {
    super(props);

    this.roles = ["owner", "admin", "moderator", "member"];

    this.roleName = {
      "owner": "Creador",
      "admin": "Admin",
      "moderator": "Moderador",
      "member": "Jugador"
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

      // check out for changing the icon to only a remove icon
      // and the menu into a dropdown of roles
      // http://material-ui.com/#/components/dropdown-menu

      iconButtonElement = (
        <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
          <FontIcon color={Theme.colors.grey400}
            className="material-icons">more_vert</FontIcon>
        </IconButton>
      );

      rightIconMenu = (
        <IconMenu iconButtonElement={iconButtonElement} >

          { changeRoles.map( role => {
            return (<MenuItem
              onClick={ () => { this.props.changeRole(model.id, role); }} >
                { this.roleName[role] }</MenuItem>)
          }) }

          { canKick ? <MenuDivider /> : <MenuItem></MenuItem> }
          { canKick ? <MenuItem
            onClick={ e => { this.props.kickMember(model.id); } } >
              {__.remove}</MenuItem> : <MenuItem></MenuItem> }

        </IconMenu>
      );
    }

    return (
      <ListItem disabled={true} style={{ borderBottom: "1px solid #EAEAEA" }}
        leftAvatar={<Avatar src={model.user.picture} />}
        rightIconButton={rightIconMenu}
        primaryText={model.user.name}
        secondaryText={<p>{roleName}</p>} />
    );
  }

};

MemberItem.displayName = "MemberItem";
