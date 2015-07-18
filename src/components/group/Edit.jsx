import {Link} from 'react-router';
import Dropzone from 'react-dropzone';

import GroupStore from '../../stores/Group';
import GroupActions from '../../actions/Group';

import Header from '../Header.jsx';

export default class GroupEdit extends React.Component {

  constructor(props) {
    super(props);

    var group = new GroupStore({
      id: this.props.params.groupId
    });

    this.state = {
      model: group,
      loading: false
    };
  }

  componentDidMount() {
    this.state.model.on('change', () => {
      this.setState({ model: this.state.model });
    });

    this.state.model.fetch({
      parse: true,
      error: function(model, resp, options){
        window.app.handleError(resp.status, resp.responseText);
      }
    });
  }

  componentWillUnmount() {
    this.state.model.off('change', null, this);
  }

  save() {

    function redirect(groupId){
      window.app.router.transitionTo('groups', { groupId: groupId });
    }

    this.setState({ loading: true });

    var model = this.state.model.toJSON();

    GroupStore.instance.update(model.id,{
      title: model.title,
      description: model.description,
      picture: this.state.picture
    }, (err, group) => {

      this.setState({ loading: false });

      if (err){
        window.app.handleError(err.status, err.responseText);
        return;
      }

      GroupActions.changeGroup(group);
      window.app.router.transitionTo('group', { groupId: group.id });
    });
  }

  onDrop(files) {
    var file = files[0];
    if (file.size > 300000){
      this.setState({ picture: null, error: 'La imagen no puede superar los 300 kb' });
      return;
    }

    if (['image/jpeg', 'image/gif', 'image/png'].indexOf(file.type) === -1){
      this.setState({ picture: null, error: 'Solo Imagenes .png .jpg o .gif' });
      return;
    }

    this.setState({ picture: files[0], error: null });
  }

  changeTitle(e) {
    this.state.model.set({ 'title': e.target.value }, { silent: true });
    this.setState({ model: this.state.model });
  }

  changeDescription(e) {
    this.state.model.set({ 'description': e.target.value }, { silent: true });
    this.setState({ model: this.state.model });
  }

  render() {
    var model = this.state.model, _model = model.toJSON();

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

    var preview = '';

    if (this.state.picture) {
      preview = { backgroundImage: 'url(' + this.state.picture.preview + ')' };
    }
    else {
      preview = { backgroundImage: 'url(' + model.imageURL() + ')' };
    }

    var error = '';
    if (this.state.error){
      error = (
        <div className="form-group error-picture">
          <span className="text-danger">{this.state.error}</span>
        </div>
      );
    }

    return (
      <div>
        <Header title="Nuevo Grupo" backto="groups" />

        <div className="row">

          <form className="white col center s12 m8 offset-m2 l6 offset-l3 z-depth-1">

            <div className="row">
              <div className="group-picture">

                <Dropzone ref="dropzone" onDrop={e => { this.onDrop(e); }}>
                  {(preview ? <div className="preview" style={preview} /> : '')}
                  <div className="info center-align">Suelta una imagen o click para seleccionar.</div>
                </Dropzone>

              </div>

              {error}
            </div>

            <div className="row">
              <div className="input-field col s12">

                <input id="title" type="text" className="validate"
                  placeholder="Los pibes de la esquina" onChange={e => { this.changeTitle(e); }}
                  value={_model.title} />

                <label htmlFor="title">Título</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">

                <textarea id="description" className="materialize-textarea"
                  placeholder="Para el fulbito de los sábados. Si llueve se suspende!"
                  onChange={e => { this.changeDescription(e); }}
                  value={_model.description} />

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
