
import GroupStore from "../../stores/Group";
import GroupItem from "./Item.jsx";
import GroupActions from "../../actions/Group";

import ReactListener from "../ReactListener";
import { Link } from "react-router";
import { FontIcon, FloatingActionButton } from "material-ui";

export default class GroupList extends ReactListener {

  constructor(props) {
    super(props);

    this.state.groups = [];
    this.store = GroupStore;
  }

  componentDidMount() {
    super.componentDidMount();
    GroupActions.find();
  }

  onFind(groups) {
    super.onFind();
    this.setState({ groups });
  }

  onChange(groups, group){
    this.setState({ groups });
  }

  onRemove(groups, id){
    this.setState({ groups });
  }

  render() {

    var groups = this.state.groups.filter( g => {
      return (["active", "pending"].indexOf(g.member.state) > -1);
    });

    var list = () => {

      if (this.state.loading){
        return (
          <div>{__.loading}</div>
        );
      }

      if (groups.length){
        return (
          groups.map(model => {
            return <GroupItem key={model.id} model={model} />;
          })
        );
      }

      return (
        <div>
          <p>{__.group_start_1}</p>
          <p>{__.group_start_2}</p>
          <p>{__.group_start_3}</p>
        </div>
      );
    }();

    return (
      <div style={Theme.css.pageContent}>
        {list}
        <FloatingActionButton
          primary={true}
          containerElement={<Link to="groupnew" />}
          tooltip={__.group_create}
          linkButton={true}
          style={Theme.css.actionButton}>
          <FontIcon className="material-icons">group_add</FontIcon>
        </FloatingActionButton>
      </div>
    );
  }

};

GroupList.displayName = "GroupList";