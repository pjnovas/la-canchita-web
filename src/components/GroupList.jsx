import {ButtonLink} from 'react-router-bootstrap';

import GroupsStore from '../stores/Groups';
import GroupItem from './GroupItem.jsx';
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

  close(){
    console.log('closed modal!');
  }

  render() {

    return (
      <ul className="media-list">
        {this.props.collection.map(model => {
          return <GroupItem key={model.get('id')} model={model} />;
        })}

        {
          (this.props.collection.length ? '' :
          <li className="media media-info">
            <p>Grupos de amigos, compañeros, etc. con los que te juntas a jugar a la pelota.</p>
            <p>Podés recibir invitaciones o crear un grupo e invitar vos</p>
          </li>
          )
        }

        <li className="media media-buttons">
          <ButtonLink to="newgroup">Crear Grupo</ButtonLink>
        </li>
      </ul>
    );
  }

};

GroupList.displayName = 'GroupList';
GroupList.propTypes = {
  collection: React.PropTypes.instanceOf(GroupsStore).isRequired
};
