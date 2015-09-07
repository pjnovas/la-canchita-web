
import {GroupStore} from "../../stores";
import {GroupActions} from "../../actions";

import MemberList from "../member/List.jsx";
//import MeetingList from "../meeting/List.jsx";
import Header from "../Header.jsx";

import { Button, Grid, Row, Col, TabbedArea, TabPane } from "react-bootstrap";
import { Card, ActionButton } from "../controls";

export default class GroupView extends React.Component {

  constructor(props) {
    super(props);

    this.state = GroupView.defaultState;
    this.state.id = this.props.params.groupId;

    this.editors = ["owner", "admin"];
    this.destroyers = ["owner"];

    switch (this.props.params.tab){
      case "members":
        this.state.selectedKey = 2;
      break;
      case "meetings":
        this.state.selectedKey = 3;
      break;
    }
  }

  componentDidMount() {
    this.evChangeGroup = GroupStore.addListener(this.onChangeGroup.bind(this));
    this.evErrorGroup = GroupStore.onError(this.onError.bind(this));

    GroupActions.findOne(this.state.id);
  }

  componentWillUnmount() {
    this.evChangeGroup.remove();
    this.evErrorGroup.remove();
    //GroupActions.leaveRoom(this.state.id);
  }

  onError(error){
    if (error.status === 404){
      window.location = "/notfound";
    }
  }

  onChangeGroup(){
    let group = GroupStore.getStateById(this.state.id);

    if (!group){
      // was destroyed
      window.app.router.transitionTo("groups");
    }

    this.setState({ group, me: group.member, loading: false });
    //setTimeout(() => GroupActions.joinRoom(group.id), 100);
  }

  onDestroyClick(){
    GroupActions.destroy(this.state.id);
  }

  onChangeTab(key){
    this.setState({ selectedKey: key });
  }

  render() {
    let model = this.state.group || {};
    let myRole = this.state.me && this.state.me.role || "member";
    let canEdit = this.editors.indexOf(myRole) > -1;
    let canRemove = this.destroyers.indexOf(myRole) > -1;

    let members = model && model.members || [];

    let actions = [];

    if (canRemove){
      actions = [
        (<Button bsStyle="link" onClick={ () => { this.onDestroyClick(); } }>
          {__.remove}
        </Button>)
      ];
    }

    return (
      <div>
        <Header backto="groups" flat={true}/>

        <TabbedArea defaultActiveKey={1}  activeKey={this.state.selectedKey}
          animation={false} onSelect={ (key) => { this.onChangeTab(key); } }>

          <TabPane eventKey={1} tab={__.group_tab_info}>

            <Grid>
              <Card
                title={model.title}
                description={model.description}
                media={ model.picture ? "/images/groups/" + model.picture : null }
                actions={actions}>
              </Card>
            </Grid>

            { canEdit ?
              <ActionButton bsStyle="primary" icon="pencil"
                to="groupedit" params={{groupId: this.state.id}}/>
            : null }

          </TabPane>

          <TabPane eventKey={2} tab={__.group_tab_members}>
            <MemberList groupId={this.state.id} myRole={myRole} members={members} />
          </TabPane>

          <TabPane eventKey={3} tab={__.group_tab_meetings}>

          </TabPane>

        </TabbedArea>

      </div>
    );
  }

};

GroupView.displayName = "GroupView";
GroupView.defaultState = {
  selectedKey: 1,
  me: null,
  group: null
};

/*
<TabPane eventKey={4} tab={__.group_tab_settings} disabled>
  Settings
</TabPane>

<MeetingList groupId={this.state.id} myRole={myRole}/>
*/
