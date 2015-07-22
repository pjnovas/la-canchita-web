
import GroupStore from '../../stores/Group';
import GroupActions from '../../actions/Group';

import MemberList from '../member/List.jsx';
import Header from '../Header.jsx';

import ReactListener from '../ReactListener';
import {Button, ButtonAction, Tabs} from '../controls';

export default class GroupView extends ReactListener {

  constructor(props) {
    super(props);

    this.state.id = this.props.params.groupId;
    this.store = GroupStore;
  }

  componentDidMount() {
    super.componentDidMount();
    GroupActions.findOne(this.state.id);
  }

  onFind(group) {
    super.onFind();
    this.setState(group);
  }

  onDestroyClick(){
    GroupActions.destroy(this.state.id);
  }

  onDestroy() {
    window.app.router.transitionTo('groups');
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

    var tabs = [{
      css: 's3',
      id: 'info',
      icon: 'info_outline',
      text: 'Detalle',
      active: true
    }, {
      css: 's3',
      id: 'players',
      icon: 'group',
      text: 'Jugadores'
    }, {
      css: 's3',
      id: 'matches',
      icon: 'event_note',
      text: 'Partidos'
    }, {
      css: 's3 disabled',
      id: 'chrono',
      icon: 'settings',
      text: 'Configurar'
    }];

    return (
      <div className="groups view">
        <Header backto="groups" navs={navs} />

        <div className="container fluid-mobile">

          <div className="row">

            <div className="col s12">
              <Tabs tabs={tabs} />
            </div>

            <div id="info" className="col s12">

              <header style={style}>
                <h1>{this.state.title}</h1>
              </header>

              <p className="flow-text description">{this.state.description}</p>

              <ButtonAction icon="mode_edit"
                to="groupedit" params={{groupId: this.state.id}}/>

              <div className="row">
                <div className="col s12">
                  <Button text="eliminar groupo" css="red left"
                    hidden={this.state.destroying}
                    onClick={ () => { this.onDestroyClick(); } } />
                </div>
              </div>

            </div>

            <div id="players" className="col s12">
              <MemberList groupId={this.state.id} />
            </div>

            <div id="matches" className="col s12">
              <ButtonAction icon="add" to="groups"/>
            </div>

          </div>

        </div>
      </div>
    );
  }

};

GroupView.displayName = 'GroupView';
