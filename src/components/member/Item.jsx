
import {Icon} from '../controls';

export default class MemberItem extends React.Component {

  constructor(props) {
    super(props);

    this.roles = ['owner', 'admin', 'moderator', 'member'];

    this.roleName = {
      'owner': 'Creador',
      'admin': 'Admin',
      'moderator': 'Moderador',
      'member': 'Jugador'
    };

    this.kickers = ['owner', 'admin'];
  }

  componentDidMount() {
    $(React.findDOMNode(this.refs.roles)).dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false,
      hover: false,
      gutter: 0,
      belowOrigin: false
    });
  }

  render() {
    var model = this.props.model;
    var myRole = this.props.myRole || 'member';

    var isMe = (model.user.id == window.user.id);
    var myRoleIdx = this.roles.indexOf(myRole);

    var canKick = false;
    if (!isMe && this.kickers.indexOf(myRole) > -1){
      canKick = this.roles.indexOf(model.role) > myRoleIdx;
    }

    var changeRoles = this.roles.filter( role => {
      return (model.role !== role && this.roles.indexOf(role) >= myRoleIdx);
    });

    var roleDDL = "roles-ddl-" + model.id;
    var roleName = this.roleName[model.role];

    return (
      <li className={ "collection-item avatar " + (isMe ? 'me' : '') }>
        <img src={model.user.picture} className="circle" />
        <span className="title">{model.user.name}</span>
        <p>{roleName}</p>

        { !isMe && myRole !== 'member' && changeRoles.length ?
        <a ref="roles" data-activates={roleDDL} className="dropdown-button secondary-content">
          <Icon name="more_vert" />
        </a>
        : null }

        <ul id={roleDDL} className="dropdown-content">
          { changeRoles.map( role => {
            return (
              <li>
                <a onClick={ e => { this.props.changeRole(model.id, role); } }>
                  { this.roleName[role] }
                </a>
              </li>
              );
            }) }
          { canKick ? <li className="divider"></li> : null }
          { canKick ? <li><a className="red-text"
            onClick={ e => { this.props.kickMember(model.id); } }>Eliminar</a></li> : null }
        </ul>
      </li>
    );
  }

};

MemberItem.displayName = 'MemberItem';
