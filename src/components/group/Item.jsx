
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
    var style = { backgroundImage: 'url(' + model.imageURL() + ')' };

    return (
      <li className="media">
        <Link to="group" params={{groupId: _model.id}}>
          <div className="media-left media-middle media-pic" style={style}></div>
          <div className="media-body">
            <h4>{_model.title}</h4>
            <p>{_model.description}</p>
          </div>
          <div className="counters">
            <div>
              {model.count('members')}<i className="fa fa-group"></i>
            </div>
            <div>
              {model.count('meetups')}<i className="fa fa-futbol-o"></i>
            </div>
          </div>
        </Link>
      </li>
    );
  }

};

GroupItem.displayName = 'GroupItem';
GroupItem.propTypes = {
  model: React.PropTypes.instanceOf(GroupStore).isRequired
};
