
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

    return (
      <li className="media" onClick={e => this.onGroupClick(e)}>
        <div className="media-left media-middle">
          <img className="media-object" src={imageURL} />
        </div>
        <div className="media-body">
          <h4>{this.props.model.get('title')}</h4>
          <p>{this.props.model.get('description')}</p>
        </div>
      </li>
    );
  }

};

GroupItem.displayName = 'GroupItem';
GroupItem.propTypes = {
  model: React.PropTypes.instanceOf(GroupStore).isRequired
};
