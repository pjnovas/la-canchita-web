import {Link} from 'react-router';

import GroupStore from '../../stores/Group';
import GroupItem from './Item.jsx';
import GroupActions from '../../actions/Group';

import Events from '../Events';
import shortid from 'shortid';

export default class GroupList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      loading: true
    };

    this.cid = shortid.generate();
  }

  componentDidMount() {
    Events.attach(this.cid, this, GroupStore);
    GroupStore.fetch();
  }

  componentWillUnmount() {
    Events.detach(this.cid);
  }

  onStartFetch() {
    this.setState({ loading: true });
  }

  onEndFetch() {
    this.setState({ groups: GroupStore.get() });
    this.setState({ loading: false });
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
        <div className="fixed-action-btn">
          <Link to="groupnew" className="btn-floating btn-large">
            <i className="large material-icons">group_add</i>
          </Link>
        </div>
      </div>
    );
  }

};

GroupList.displayName = 'GroupList';
