
import GroupStore from '../../stores/Group';
import GroupActions from '../../actions/Group';

import MemberList from '../member/List.jsx';
import Header from '../Header.jsx';

import {Link} from 'react-router';

export default class GroupView extends React.Component {

  constructor(props) {
    super(props);

    var group = GroupStore.instance;
    group.clear().set("id", this.props.params.groupId);

    this.state = {
      model: group,
      loading: false
    };
  }

  componentDidMount() {

    this.state.model.on('change', () => {
      this.setState({ model: this.state.model });
    }, this);

    this.state.model.fetch({
      parse: true,
      error: function(model, resp, options){
        window.app.handleError(resp.status, resp.responseText);
      }
    });

    $(React.findDOMNode(this.refs.tabs)).tabs();
  }

  componentWillUnmount() {
    this.state.model.off('change', null, this);
  }

  render() {
    var model = this.state.model, _model = model.toJSON();

    var style = {};
    if (_model.picture){
      style = { backgroundImage: 'url(' + _model.picture + ')' };
    }

    var members = model.get('members');

    var navs = [/*{
      to: 'groupedit',
      params: { groupId: _model.id },
      text: 'Editar',
      icon: 'mode_edit'
    }*/];

    return (
      <div className="groups view">
        <Header backto="groups" navs={navs} />

        <div className="container fluid-mobile">

          <div className="row">

            <div className="col s12">

              <ul className="tabs" ref="tabs">

                <li className="tab col s3">
                  <a href="#info" className="active">
                    <i className="material-icons">info_outline</i>
                    Detalle
                  </a>
                </li>

                <li className="tab col s3">
                  <a href="#players">
                    <i className="material-icons">group</i>
                    Jugadores
                  </a>
                </li>

                <li className="tab col s3">
                  <a href="#matches">
                    <i className="material-icons">event_note</i>
                    Partidos
                  </a>
                </li>

                <li className="tab col s3 disabled">
                  <a href="#chrono">
                    <i className="material-icons">settings</i>
                    Configurar
                  </a>
                </li>
              </ul>
            </div>

            <div id="info" className="col s12">

              <header style={style}>
                <h1>{_model.title}</h1>
              </header>

              <p className="flow-text description">{_model.description}</p>

              <div className="fixed-action-btn">
                <Link to="groupedit" params={{groupId: _model.id}}
                  className="btn-floating btn-large">
                  <i className="large material-icons">mode_edit</i>
                </Link>
              </div>

            </div>

            <div id="players" className="col s12">
              {members ? <MemberList collection={members} /> : ''}
            </div>

            <div id="matches" className="col s12">

              <div className="fixed-action-btn">
                <Link to="groups" className="btn-floating btn-large">
                  <i className="large material-icons">add</i>
                </Link>
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }

};

GroupView.displayName = 'GroupView';
