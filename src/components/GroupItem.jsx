
import GroupStore from '../stores/Group';

export default class GroupItem extends React.Component {

  componentDidMount() {

    this.props.model.on('change', () => {
      this.setState({ model: this.props.model });
    });

  }

  componentWillUnmount() {
    this.props.model.off('change', null, this);
  }

  onGroupClick(e){
    console.log(this.props.model.get('title') + ' Clicked!');
  }

  render() {
    var imageURL = '/images/groups/' + this.props.model.get('id') + '.jpg';
    var style = { backgroundImage: 'url(' + imageURL + ')' };

    var members = this.props.model.get('members');
    var pCount = members && members.length || 0;

    var meetups = this.props.model.get('meetups');
    var mCount = meetups && meetups.length || 0;

    return (
      <li className="media" onClick={e => this.onGroupClick(e)}>
        <div className="media-left media-middle media-pic" style={style}></div>
        <div className="media-body">
          <h4>{this.props.model.get('title')}</h4>
          <p>{this.props.model.get('description')}</p>
        </div>
        <div className="counters">
          <div>
            {pCount}<i className="fa fa-group"></i>
          </div>
          <div>
            {mCount}<i className="fa fa-futbol-o"></i>
          </div>
        </div>
      </li>
    );
  }

};

GroupItem.displayName = 'GroupItem';
GroupItem.propTypes = {
  model: React.PropTypes.instanceOf(GroupStore).isRequired
};
