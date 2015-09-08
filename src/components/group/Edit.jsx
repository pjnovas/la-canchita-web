
import _ from "lodash";

import {GroupStore} from "../../stores";
import {GroupActions} from "../../actions";

import Header from "../Header.jsx";
import Form from "./Form.jsx";

import { Grid } from "react-bootstrap";
import { Paper } from "../controls";

export default class GroupCreate extends React.Component {

  constructor(props) {
    super(props);

    this.state = _.cloneDeep(GroupCreate.defaultState);
    this.props.id = (this.props.params && this.props.params.groupId) || null;
  }

  componentDidMount(){
    this.evChangeGroup = GroupStore.addListener(this.onChangeGroup.bind(this));

    if (this.props.id){
      let model = GroupStore.getStateById(this.props.id);
      this.setState({ model });
    }
  }

  componentWillUnmount() {
    this.evChangeGroup.remove();
  }

  onChangeGroup(){

    if (this.state.saving){
      this.redirect();
      return;
    }

    if (this.props.id){
      this.setState({ model: GroupStore.getStateById(this.props.id) });
    }
  }

  redirect(gid){
    if (gid){
      window.app.router.transitionTo("group", { groupId: gid });
      return;
    }

    window.app.router.transitionTo("groups");
  }

  onSave(){
    if (this.state.dirty){
      this.setState({ saving: true });

      if (this.props.id){
        GroupActions.update(this.props.id, this.state.model);
      }
      else {
        GroupActions.create(this.state.model);
      }

      return;
    }

    this.redirect();
  }

  onChange(prop, value){
    let model = this.state.model;
    model[prop] = value;
    this.setState({ model, dirty: true });
  }

  onCancel() {
    this.redirect();
  }

  render() {

    return (
      <div>
        { this.props.id ?
        <Header backto="group" backparams={ { groupId: this.props.id }} />
        : <Header backto="groups" /> }

        <Grid>
          <Paper skipHeader>

            <Form {...this.state.model}
              formTitle={this.props.id ? __.group_title_edit : __.group_title_create}
              onChange={ (prop, value) => this.onChange(prop, value) }
              onSave={ () => { this.onSave(); }}
              onCancel={ () => { this.onCancel(); }} />

          </Paper>
        </Grid>

      </div>
    );
  }

};

GroupCreate.displayName = "GroupCreate";
GroupCreate.defaultState = {
  model: {
    title: "",
    description: ""
  },
  dirty: false,
  saving: false
};
GroupCreate.defaultProps = {
  id: null
};
