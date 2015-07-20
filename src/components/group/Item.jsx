
import Group from '../../models/Group';
import {Link} from 'react-router';

export default class GroupItem extends React.Component {

  componentDidMount() {
    // TODO: GroupsStore.on change group
    //this.props.model.on('change', () => {
    //  this.setState({ model: this.props.model });
    //}, this);
  }

  componentWillUnmount() {
    //this.props.model.off('change', null, this);
  }

  render() {
    var model = this.props.model;

    return (
      <div className="col s12 m6 l4">
        <div className="card small">
          <div className="card-image">
            <img src={model.picture}/>
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
