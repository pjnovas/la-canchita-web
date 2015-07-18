import {Link} from 'react-router';

import GroupsStore from '../../stores/Groups';
import GroupItem from './Item.jsx';
import GroupActions from '../../actions/Group';

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

  render() {

    var list = () => {

      if (this.props.collection.length){
        return (
          this.props.collection.map(model => {
            return <GroupItem key={model.get('id')} model={model} />;
          })
        );
      }

      return (
        <li className="media media-info">
          <p>Grupos de amigos, compañeros, etc. con los que te juntas a jugar a la pelota.</p>
          <p>Podés recibir invitaciones o crear un grupo e invitar vos</p>
        </li>
      );
    }();

    return (
      <div>
        <div className="row">{list}</div>
        <div className="fixed-action-btn">
          <Link to="newgroup" className="btn-floating btn-large">
            <i className="large material-icons">group_add</i>
          </Link>
        </div>
      </div>
    );
  }

};

GroupList.displayName = 'GroupList';
GroupList.propTypes = {
  collection: React.PropTypes.instanceOf(GroupsStore).isRequired
};
