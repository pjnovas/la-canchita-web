
import {Link} from 'react-router';

export default class GroupItem extends React.Component {

  render() {
    var model = this.props.model;

    return (
      <div className="col s12 m6 l4">
        <div className="card small">
          <div className="card-image">
            <img src={ "/images/groups/" + model.picture }/>
            <span className="card-title">{model.title}</span>
          </div>
          <div className="card-content">
            <p>{model.description}</p>
          </div>
          <div className="card-action">
            <Link to="group" params={{groupId: model.id}}>Abrir</Link>
          </div>
        </div>
      </div>
    );
  }

};

GroupItem.displayName = 'GroupItem';
