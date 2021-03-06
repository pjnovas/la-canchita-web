
import { Row, Col } from "react-bootstrap";
import { Avatar, Icon, Confirm } from "../controls";

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

    this.state = MemberItem.defaultState;
  }

  onKickClick(){
    this.setState({ confirmKick: true });
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

    let options;
    if (!isMe && myRole !== "member" && changeRoles.length) {

      options = (
        <div className="btn-group">

          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
            <Icon name="ellipsis-v" />
          </button>

          <ul className="dropdown-menu dropdown-menu-right">

            { this.props.changeRole ?
              <li className="dropdown-header">{__.member_change_role}</li>
            : null }

            { changeRoles.map( role => {
              if (!this.props.changeRole){
                return null;
              }

              return (
                <li key={role}>
                  <a onClick={ () => { this.props.changeRole(model.id, role); }}>{ this.roleName[role] }</a>
                </li>
              )
            }) }

            { this.props.changeRole && canKick ? <li className="divider"></li> : null }
            { canKick ? (
              <li>
                <a className="text-danger"
                  onClick={ e => { this.onKickClick(model); } }>
                  <Icon name="close" /> {__.remove}</a>
              </li>)
             : null }

          </ul>
        </div>
      );
    }

    return (
      <div className="list-group-item">
        <Row>

          <Col xs={2} sm={1} className="avatar-col">
            <Avatar src={model.user.picture} />
          </Col>

          <Col xs={10} sm={11}>
            <h4 className="list-group-item-heading">{model.user.name}</h4>
            <p>{roleName}</p>
          </Col>

          {options}

          { this.state.confirmKick ?
            <Confirm title={__.member_kick_title.replace("{1}", model.user.name)}
              text={__.member_kick_text.replace("{1}", model.user.name)}
              onClose={ () => this.setState({ confirmKick: false }) }
              onAccept={ () => this.props.kickMember(model.id) } />
          : null }

        </Row>
      </div>
    );
  }

};

MemberItem.displayName = "MemberItem";
MemberItem.defaultState = {
  confirmKick: false
};
