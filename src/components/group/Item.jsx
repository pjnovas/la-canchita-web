
import MemberActions from '../../actions/Member';

import {Icon} from '../controls';
import {Link} from 'react-router';

export default class GroupItem extends React.Component {

  onAcceptClick() {
    MemberActions.accept(this.props.model.id);
  }

  onDeclineClick() {
    MemberActions.decline(this.props.model.id);
  }

  render() {
    var model = this.props.model;

    var isInvite = model.member.state === 'pending';

    return (
      <div className="col s12 m6 l4">
        <div className="card small">

          { isInvite ?
          <div className="card-tag invite">
            <Icon name="arrow_forward" />
            <span>Invitación</span>
          </div>
          : null }

          <div className="card-image">
            <img src={ "/images/groups/" + model.picture }/>
            <span className="card-title">{model.title}</span>
          </div>
          <div className="card-content">
            <p>{model.description}</p>
          </div>
          <div className="card-action">

            { isInvite ?
              <div>
                <a className="left muted"
                  onClick={ e => { this.onDeclineClick(e); } }>ignorar</a>
                <a className="right"
                  onClick={ e => { this.onAcceptClick(e); } }>aceptar</a>
              </div>
            :
              <Link className="right" to="group" params={{groupId: model.id}}>Abrir</Link>
            }

          </div>
        </div>
      </div>
    );
  }

};

GroupItem.displayName = 'GroupItem';
