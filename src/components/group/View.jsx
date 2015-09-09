
import {GroupStore} from "../../stores";
import {GroupActions} from "../../actions";

import GroupDetail from "./Detail.jsx";
import MemberList from "../member/List.jsx";
import MeetingList from "../meeting/List.jsx";
import Header from "../Header.jsx";

import { Button, Grid, Row, Col, TabbedArea, TabPane } from "react-bootstrap";
import { Card, ActionButton } from "../controls";

export default class GroupView extends React.Component {

  constructor(props) {
    super(props);

    this.state = GroupView.defaultState;
    this.state.id = this.props.params.groupId;

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

    if (!group){ // was destroyed
      window.app.router.transitionTo("groups");
      return;
    }

    this.setState({ group, loading: false });
    //setTimeout(() => GroupActions.joinRoom(group.id), 100);
  }

  onChangeTab(key){
    this.setState({ selectedKey: key });
  }

  render() {
    let model = this.state.group || {};
    let myRole = model.member && model.member.role || "member";
    let members = model && model.members || [];
    let meetings = model && model.meetings || [];

    return (
      <div>
        <Header backto="groups" flat={true}/>

        <TabbedArea defaultActiveKey={1}  activeKey={this.state.selectedKey}
          animation={false} onSelect={ (key) => { this.onChangeTab(key); } }>

          <TabPane eventKey={1} tab={__.group_tab_info}>
            <GroupDetail model={model} />
          </TabPane>

          <TabPane eventKey={2} tab={__.group_tab_members}>
            <MemberList groupId={this.state.id} myRole={myRole} members={members} />
          </TabPane>

          <TabPane eventKey={3} tab={__.group_tab_meetings}>
            <MeetingList groupId={this.state.id} myRole={myRole} meetings={meetings}/>
          </TabPane>

        </TabbedArea>

      </div>
    );
  }

};

GroupView.displayName = "GroupView";
GroupView.defaultState = {
  selectedKey: 1,
  group: null
};

/*
<TabPane eventKey={4} tab={__.group_tab_settings} disabled>
  Settings
</TabPane>
*/
