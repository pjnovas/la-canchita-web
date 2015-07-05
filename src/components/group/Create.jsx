import {Link} from 'react-router';
import Dropzone from 'react-dropzone';
import request from 'superagent';

import GroupsStore from '../../stores/Groups';
import GroupStore from '../../stores/Group';
import GroupActions from '../../actions/Group';

import Header from '../Header.jsx';

export default class GroupEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      model: new GroupStore(),
      loading: false
    };
  }

  create() {

    var newGroup = {
      title: React.findDOMNode(this.refs.title).value,
      description: React.findDOMNode(this.refs.description).value,
    };

    function redirect(groupId){
      window.app.router.transitionTo('groups', { groupId: groupId });
    }

    GroupsStore.instance
      .once('request', () => {
        this.setState({ loading: true });
      })
      .once('sync', (model, resp, options) => {

        if (this.state.picture){
          request
            .post('/api/groups/' + resp.id + '/picture')
            .attach('image', this.state.picture)
            .end((err, res) => {
              if (err) throw new Error(err);
              redirect(resp.id);
            });

          return;
        }

        redirect(resp.id);
      });

    GroupActions.createGroup(newGroup);
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

  render() {

    var buttons = () => {

      if (this.state.loading){
        return (
          <a className="btn btn-default pull-right">
            <i className="fa fa-circle-o-notch fa-spin"></i>
          </a>
        );
      }

      return (
        <div>
          <Link className="link-cancel pull-left" to="groups">cancelar</Link>
          <a className="btn btn-default pull-right" onClick={e => { this.create(e); } }>Crear!</a>
        </div>
      );
    }();

    var preview = '';
    if (this.state.picture){
      preview = { backgroundImage: 'url(' + this.state.picture.preview + ')' };
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

        <div className="inner">
          <form className="form-horizontal">
            <div className="group-picture">
              <Dropzone ref="dropzone" onDrop={e => { this.onDrop(e); }}>
                {(preview ? <div className="preview" style={preview} /> : '')}
                <div className="info">Suelta una imagen o click para seleccionar.</div>
              </Dropzone>
            </div>
            {error}
            <div className="form-group">
              <label className="col-sm-2 control-label">Título</label>
              <div className="col-sm-8">
                <input ref="title" type="text" className="form-control"
                  placeholder="Los pibes de la esquina"
                  value={this.state.model.get('title')} />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">Descripción</label>
              <div className="col-sm-8">
                <textarea ref="description" className="form-control" rows="5"
                  placeholder="Para el fulbito de los sábados. Si llueve se suspende!"
                  value={this.state.model.get('description')} />
              </div>
            </div>
            <div className="col-sm-8 col-sm-offset-2">
              {buttons}
            </div>
          </form>
        </div>

      </div>
    );
  }

};

GroupEdit.displayName = 'GroupEdit';
