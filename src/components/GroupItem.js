
import NavBar from './NavBar.jsx';
import Backbone from 'backbone';
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

  render() {

    return (
      <li>{this.props.model.get('name')}</li>
    );
  }

};

GroupItem.displayName = 'GroupItem';
GroupItem.propTypes = {
  model: React.PropTypes.instanceOf(GroupStore).isRequired
};