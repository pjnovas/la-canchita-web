
import GroupStore from '../../stores/Group';
import GroupActions from '../../actions/Group';

import MemberList from '../member/List.jsx';
import Header from '../Header.jsx';

import Events from '../Events';
import shortid from 'shortid';

import {Link} from 'react-router';

export default class GroupView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.params.groupId,
      loading: false
    };

    this.cid = shortid.generate();
  }

  componentDidMount() {
    Events.attach(this.cid, this, GroupStore);
    GroupStore.fetchOne(this.state.id);
    $(React.findDOMNode(this.refs.tabs)).tabs();
  }

  componentWillUnmount() {
    Events.detach(this.cid);
  }

  onStartFetch() {
    this.setState({ loading: true });
  }

  onEndFetch() {
    this.setState(GroupStore.get(this.state.id));
    this.setState({ loading: false });
  }



  onDestroy(){
    GroupActions.destroy(this.state);
  }

  onStartDestroy() {
    this.setState({ loading: true });
  }

  onEndDestroy() {
    this.setState({ loading: false });
    window.app.router.transitionTo('groups');
  }

  onErrorDestroy(err) {
    this.setState({ loading: false });
    this.setState({ error: err });
  }

  render() {

    var style = {};
    if (this.state.picture){
      style = { backgroundImage: 'url(/images/groups/' + this.state.picture + ')' };
    }

    var navs = [/*{
      to: 'groupedit',
      params: { groupId: this.state.id },
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
                <h1>{this.state.title}</h1>
              </header>

              <p className="flow-text description">{this.state.description}</p>

              <div className="fixed-action-btn">
                <Link to="groupedit" params={{groupId: this.state.id}}
                  className="btn-floating btn-large">
                  <i className="large material-icons">mode_edit</i>
                </Link>
              </div>

            </div>

            <div id="players" className="col s12">
              {this.state.members ? <MemberList collection={this.state.members} /> : ''}
            </div>

            <div id="matches" className="col s12">

              <div className="fixed-action-btn">
                <Link to="groups" className="btn-floating btn-large">
                  <i className="large material-icons">add</i>
                </Link>
              </div>

            </div>

          </div>

        {this.state.loading ? '' :
          <div className="row">
            <div className="col s12">
              <a className="btn-large waves-effect waves-light red left"
                onClick={ () => { this.onDestroy(); } }>eliminar grupo</a>
            </div>
          </div>
        }

        </div>
      </div>
    );
  }

};

GroupView.displayName = 'GroupView';
