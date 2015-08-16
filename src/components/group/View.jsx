
import GroupStore from "../../stores/Group";
import GroupActions from "../../actions/Group";

import MemberList from "../member/List.jsx";
import MeetingList from "../meeting/List.jsx";
import Header from "../Header.jsx";

import ReactListener from "../ReactListener";

import { Button, Grid, Row, Col, TabbedArea, TabPane } from "react-bootstrap";
import { Card, ActionButton } from "../controls";

export default class GroupView extends ReactListener {

  constructor(props) {
    super(props);

    this.state.id = this.props.params.groupId;
    this.state.selectedKey = 1;
    this.store = GroupStore;

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

  onChangeTab(key){
    this.setState({ selectedKey: key });
  }

  render() {
    let model = this.state.group || {};
    let myRole = this.state.me && this.state.me.role || "member";
    let canEdit = this.editors.indexOf(myRole) > -1;
    let canRemove = this.destroyers.indexOf(myRole) > -1;

    let actions = [];

    if (canRemove){
      actions = [
        (<Button bsStyle="link" disable={this.state.destroying}
          onClick={ () => { this.onDestroyClick(); } }>
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
            <MemberList groupId={this.state.id} myRole={myRole} />
          </TabPane>

          <TabPane eventKey={3} tab={__.group_tab_meetings}>
            <MeetingList groupId={this.state.id} myRole={myRole}/>
          </TabPane>

        </TabbedArea>

      </div>
    );
  }

};

GroupView.displayName = "GroupView";
/*
<TabPane eventKey={4} tab={__.group_tab_settings} disabled>
  Settings
</TabPane>
*/
