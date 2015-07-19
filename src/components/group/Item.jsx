
import GroupStore from '../../stores/Group';
import {Link} from 'react-router';

export default class GroupItem extends React.Component {

  componentDidMount() {
    this.props.model.on('change', () => {
      this.setState({ model: this.props.model });
    });
  }

  componentWillUnmount() {
    this.props.model.off('change', null, this);
  }

  render() {
    var model = this.props.model, _model = model.toJSON();

    return (
      <div className="col s12 m6 l4">
        <div className="card small">
          <div className="card-image">
            <img src={_model.picture}/>
            <span className="card-title">{_model.title}</span>
          </div>
          <div className="card-content">
            <p>{_model.description}</p>
          </div>
          <div className="card-action">
            <Link to="group" params={{groupId: _model.id}}>Abrir</Link>
          </div>
        </div>
      </div>
    );
  }

};

GroupItem.displayName = 'GroupItem';
GroupItem.propTypes = {
  model: React.PropTypes.instanceOf(GroupStore).isRequired
};


/*
<div className="counters">
  <div>
    {model.count('members')}<i className="fa fa-group"></i>
  </div>
  <div>
    {model.count('meetups')}<i className="fa fa-futbol-o"></i>
  </div>
</div>
*/