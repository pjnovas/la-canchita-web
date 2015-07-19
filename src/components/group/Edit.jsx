import {Link} from 'react-router';

import GroupStore from '../../stores/Group';
import GroupActions from '../../actions/Group';

import Header from '../Header.jsx';
import DropPicture from './DropPicture.jsx';

export default class GroupEdit extends React.Component {

  constructor(props) {
    super(props);

    this.model = new GroupStore({
      id: this.props.params.groupId
    });

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.model.on('change', () => {
      this.setState(this.model.toJSON());
    });

    this.model.fetch({
      parse: true,
      error: function(model, resp, options){
        window.app.handleError(resp.status, resp.responseText);
      }
    });
  }

  componentWillUnmount() {
    this.model.off('change', null, this);
  }

  save() {

    function redirect(groupId){
      window.app.router.transitionTo('groups', { groupId: groupId });
    }

    this.setState({ loading: true });

    GroupStore.instance.update(this.state.id,{
      title: this.state.title,
      description: this.state.description,
      picture: this.state.newpicture
    }, (err, group) => {

      this.setState({ loading: false });

      if (err){
        window.app.handleError(err.status, err.responseText);
        return;
      }

      //GroupActions.changeGroup(group);
      window.app.router.transitionTo('group', { groupId: group.id });
    });
  }

  changeTitle(e) {
    this.setState({ 'title': e.target.value });
  }

  changeDescription(e) {
    this.setState({ 'description': e.target.value });
  }

  changePicture(picture){
    this.setState({ 'newpicture': picture });
  }

  render() {

    var buttons = () => {

      if (this.state.loading){
        return (
          <div className="col s12">
            <a className="waves-effect waves-light btn-large disabled right">
              <div className="la-ball-atom la-2x left">
                <div></div><div></div><div></div><div></div>
              </div>
              guardando
            </a>
          </div>
        );
      }

      return (
        <div className="col s12">
          <Link className="waves-effect waves-teal btn-flat left" to="groups">cancelar</Link>
          <a className="waves-effect waves-light btn-large right" onClick={e => { this.save(e); } }>
            <i className="material-icons right">check</i>Guardar
          </a>
        </div>
      );
    }();

    return (
      <div>
        <Header title="Nuevo Grupo" backto="groups" />

        <div className="row">

          <form className="white col center s12 m8 offset-m2 l6 offset-l3 z-depth-1">

            <DropPicture picture={this.state.picture}
              onChangePicture={ pic => { this.changePicture(pic); }} />

            <div className="row">
              <div className="input-field col s12">

                <input id="title" type="text" className="validate"
                  placeholder="Los pibes de la esquina" onChange={e => { this.changeTitle(e); }}
                  value={this.state.title} />

                <label htmlFor="title">Título</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">

                <textarea id="description" className="materialize-textarea"
                  placeholder="Para el fulbito de los sábados. Si llueve se suspende!"
                  onChange={e => { this.changeDescription(e); }}
                  value={this.state.description} />

                <label htmlFor="description">Descripción</label>
              </div>
            </div>

            <div className="row">
              {buttons}
            </div>

          </form>

        </div>

      </div>
    );
  }

};

GroupEdit.displayName = 'GroupEdit';
