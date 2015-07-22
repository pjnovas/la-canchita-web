
import GroupStore from '../../stores/Group';
import GroupItem from './Item.jsx';
import GroupActions from '../../actions/Group';

import ReactListener from '../ReactListener';
import {ButtonAction} from '../controls';

export default class GroupList extends ReactListener {

  constructor(props) {
    super(props);

    this.state.groups = [];
    this.store = GroupStore;
  }

  componentDidMount() {
    super.componentDidMount();
    GroupActions.find();
  }

  onFind(groups) {
    super.onFind();
    this.setState({ groups });
  }

  render() {

    var list = () => {

      if (this.state.loading){
        return (
          <li>
            CARGANDO ...
          </li>
        );
      }

      if (this.state.groups.length){
        return (
          this.state.groups.map(model => {
            return <GroupItem key={model.id} model={model} />;
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
        <ButtonAction icon="group_add" to="groupnew"/>
      </div>
    );
  }

};

GroupList.displayName = 'GroupList';