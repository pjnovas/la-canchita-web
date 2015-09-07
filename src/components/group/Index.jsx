import Header from "../Header.jsx";
import GroupList from "./List.jsx";

import {GroupStore} from '../../stores';
import {GroupActions} from '../../actions';

export default class Groups extends React.Component {

  constructor(props) {
    super(props);
    this.state = Groups.defaultState;
  }

  componentDidMount() {
    this.evChangeGroup = GroupStore.addListener(this.onChangeGroups.bind(this));

    // TODO: check this getState, maybe there is no way to find() every time
    this.setState({ groups: GroupStore.getState() });

    GroupActions.find();
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
