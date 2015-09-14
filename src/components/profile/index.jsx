
import _ from "lodash";

import Header from "../Header.jsx";
import Account from "./Account.jsx";
import Settings from "./Settings.jsx";
import Notifications from "./Notifications.jsx";

import {UserStore} from '../../stores';
import {UserActions} from '../../actions';

import { TabbedArea, TabPane } from "react-bootstrap";

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = _.cloneDeep(Profile.defaultState);
  }

  componentDidMount() {
    this.evChangeProfile = UserStore.addListener(this.onChangeProfile.bind(this));
    UserActions.findMe();
  }

  componentWillUnmount() {
    this.evChangeProfile.remove();
  }

  onChangeProfile(){
    let me = UserStore.getStateById(window.user.id);
    this.setState({ model: me });
  }

  onChangeTab(key){
    this.setState({ selectedKey: key });
  }

  redirect(){
    window.app.router.transitionTo("groups");
  }

  onChange(property, value){
    let model = this.state.model;
    model[property] = value;
    this.setState({ model });
  }

  onChangeSetting(property, value){
    let model = this.state.model;
    model.settings[property] = value;
    this.setState({ model });
  }

  render() {
    let model = this.state.model;

    return (
      <div>
        <Header backto="groups" flat={true}/>

        <TabbedArea defaultActiveKey={1}  activeKey={this.state.selectedKey}
          animation={false} onSelect={ (key) => { this.onChangeTab(key); } }>

          <TabPane eventKey={1} tab={__.profile_tab_account}>
            <Account model={model} onChange={ (prop, value) => this.onChange(prop, value) } />
          </TabPane>

          <TabPane eventKey={2} tab={__.profile_tab_settings}>
            <Settings model={model} onChange={ (prop, value) => this.onChange(prop, value) }/>
          </TabPane>

          <TabPane eventKey={3} tab={__.profile_tab_notifications}>
            <Notifications model={model} onChange={ (prop, value) => this.onChangeSetting(prop, value) }/>
          </TabPane>

        </TabbedArea>
      </div>
    );
  }
}

Profile.displayName = "Profile";
Profile.defaultState = {
  selectedKey: 1,
  model: {},
};
