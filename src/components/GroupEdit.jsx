import {Link} from 'react-router';

import GroupsStore from '../stores/Groups';
import GroupStore from '../stores/Group';
import GroupActions from '../actions/Group';

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

    GroupsStore.instance
      .once('request', () => {
        this.setState( { loading: true } );
      })
      .once('sync', () => {
        window.AppRouter.transitionTo('groups');
      });

    GroupActions.createGroup(newGroup);
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

    return (
      <div>
        <h2>Nuevo Grupo</h2>
        <form className="form-horizontal">
          <div className="group-picture"></div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Título</label>
            <div className="col-sm-8">
              <input ref="title" type="text" className="form-control"
                placeholder="Los pibes de la esquina"
                value={this.state.model.get('name')} />
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
    );
  }

};

GroupEdit.displayName = 'GroupEdit';
