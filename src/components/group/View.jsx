
import GroupStore from "../../stores/Group";
import GroupActions from "../../actions/Group";

import MemberList from "../member/List.jsx";
import MeetingList from "../meeting/List.jsx";
import Header from "../Header.jsx";

import ReactListener from "../ReactListener";
import {Button, ButtonAction, Tabs} from "../controls";

export default class GroupView extends ReactListener {

  constructor(props) {
    super(props);

    this.state.id = this.props.params.groupId;
    this.store = GroupStore;

    this.editors = ["owner", "admin"];
    this.destroyers = ["owner"];
  }

  componentDidMount() {
    super.componentDidMount();
    GroupActions.findOne(this.state.id);
  }

  onFind(group) {
    super.onFind();
    this.setState({ group, me: group.member });
  }

  onDestroyClick(){
    GroupActions.destroy(this.state.id);
  }

  onDestroy() {
    window.app.router.transitionTo("groups");
  }

  render() {
    var model = this.state.group || {};

    var style = {};
    if (model.picture){
      style = { backgroundImage: "url(/images/groups/" + model.picture + ")" };
    }

    var navs = [/*{
      to: "groupedit",
      params: { groupId: this.state.id },
      text: "Editar",
      icon: "mode_edit"
    }*/];

    var tabs = [{
      css: "s3",
      id: "info",
      icon: "info_outline",
      text: "Detalle",
      active: true
    }, {
      css: "s3",
      id: "players",
      icon: "group",
      text: "Jugadores"
    }, {
      css: "s3",
      id: "matches",
      icon: "event_note",
      text: "Partidos"
    }, {
      css: "s3 disabled",
      id: "chrono",
      icon: "settings",
      text: "Configurar"
    }];

    var myRole = this.state.me && this.state.me.role || "member";
    var canEdit = this.editors.indexOf(myRole) > -1;
    var canRemove = this.destroyers.indexOf(myRole) > -1;

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
                <h1>{model.title}</h1>
              </header>

              <p className="flow-text description">{model.description}</p>

              { canEdit ?
              <ButtonAction icon="mode_edit"
                to="groupedit" params={{groupId: this.state.id}}/>
              : null }

              { canRemove ?
              <div className="row">
                <div className="col s12">
                  <Button text="eliminar groupo" css="red left"
                    hidden={this.state.destroying}
                    onClick={ () => { this.onDestroyClick(); } } />
                </div>
              </div>
              : null }

            </div>

            <div id="players" className="col s12">
              <MemberList groupId={this.state.id} />
            </div>

            <div id="matches" className="col s12">
              <MeetingList groupId={this.state.id} />
            </div>

          </div>

        </div>
      </div>
    );
  }

};

GroupView.displayName = "GroupView";
