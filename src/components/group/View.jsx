
import GroupStore from "../../stores/Group";
import GroupActions from "../../actions/Group";

import MemberList from "../member/List.jsx";
import MeetingList from "../meeting/List.jsx";
import Header from "../Header.jsx";

import ReactListener from "../ReactListener";

import { Link } from "react-router";
import { Tabs, Tab, FontIcon, FloatingActionButton, RaisedButton,
  Card, CardMedia, CardTitle, CardActions, CardText } from "material-ui";

export default class GroupView extends ReactListener {

  constructor(props) {
    super(props);

    this.state.id = this.props.params.groupId;
    this.state.tabSelected = 0;
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

  onChangeTab(idx, tab){
    this.setState({ tabSelected: idx });
  }

  render() {
    var model = this.state.group || {};
    var myRole = this.state.me && this.state.me.role || "member";
    var canEdit = this.editors.indexOf(myRole) > -1;
    var canRemove = this.destroyers.indexOf(myRole) > -1;

    var media = {
      maxHeight: "200px",
      overflow: "hidden"
    };

    return (
      <div>

        <Header backto="groups"/>

        <Tabs onChange={ (idx, tab) => { this.onChangeTab(idx, tab); } }>

          <Tab label={__.group_tab_info}>

            <Card zDepth={0} style={{background:"transparent"}}>

              <CardMedia overlay={<CardTitle title={model.title}/>} style={media}>
              { model.picture ? <img src={ "/images/groups/" + model.picture }/> : null }
              </CardMedia>

              <CardText>
                <p style={Theme.css.paragraph}>{model.description}</p>
              </CardText>

              { canRemove ?
              <CardActions>
                <RaisedButton secondary={true} label={__.remove}
                  disable={this.state.destroying}
                  onClick={ () => { this.onDestroyClick(); } } />
              </CardActions>
              : null }

            </Card>


            { this.state.tabSelected === 0 && canEdit ?
              <FloatingActionButton primary={true} linkButton={true}
                containerElement={<Link to="groupedit" params={{groupId: this.state.id}} />}
                tooltip={__.group_create}
                style={Theme.css.actionButton}>
                <FontIcon className="material-icons">mode_edit</FontIcon>
              </FloatingActionButton>
            : null }

          </Tab>

          <Tab label={__.group_tab_members}>
            <MemberList groupId={this.state.id} isVisible={this.state.tabSelected === 1}/>
          </Tab>

          <Tab label={__.group_tab_meetings}>
            <MeetingList groupId={this.state.id} isVisible={this.state.tabSelected === 2} />
          </Tab>

          <Tab label={__.group_tab_settings}>
            Nothing yet ...
          </Tab>

        </Tabs>

      </div>
    );
  }

};

GroupView.displayName = "GroupView";
