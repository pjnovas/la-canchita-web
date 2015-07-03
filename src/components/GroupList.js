
import NavBar from './NavBar.jsx';
import Backbone from 'backbone';

import GroupsStore from '../stores/Groups';

import GroupItem from './GroupItem';
import GroupActions from '../actions/Group';

export default class GroupList extends React.Component {

  componentDidMount() {

    this.props.collection.on('add remove reset', () => {
      this.setState({ collection: this.props.collection });
    });

    this.props.collection.fetch();
  }

  componentWillUnmount() {
    this.props.collection.off('add remove reset', null, this);
  }

  createGroup() {
    GroupActions.createGroup({ id: 5, name: 'Jorge' });
  }

  render() {

    return (
      <ul>
        {this.props.collection.map(model => {
          return <GroupItem key={model.get('id')} model={model} />;
        })}
        <a onClick={this.createGroup}>Crear Grupo</a>
      </ul>
    );
  }

};

GroupList.displayName = 'GroupList';
GroupList.propTypes = {
  collection: React.PropTypes.instanceOf(GroupsStore).isRequired
};