
import _ from "lodash";

import Header from "../Header.jsx";
import GroupList from "./List.jsx";

import {GroupStore} from '../../stores';
import {GroupActions} from '../../actions';

export default class Groups extends React.Component {

  constructor(props) {
    super(props);
    this.state = _.cloneDeep(Groups.defaultState);
  }

  componentDidMount() {
    this.evChangeGroup = GroupStore.addListener(this.onChangeGroups.bind(this));

    let groups = GroupStore.getState();
    if (groups && groups.length){
      this.setState({ groups: GroupStore.getState() });
      this.onChangeGroups();
    }

    setTimeout(() => GroupActions.find(), 100);
  }

  componentWillUnmount() {
    this.evChangeGroup.remove();
  }

  onChangeGroups(){
    let groups = GroupStore.getState();
    this.setState({ groups, loading: false });
  }

  render() {

    return (
      <div className="groups-ctn">
        <Header />
        { this.state.loading ? __.loading :
          <GroupList groups={this.state.groups} />
        }
      </div>
    );
  }

};

Groups.displayName = "Groups";
Groups.defaultState = {
  groups: [],
  loading: false //TODO: show a loading
};
