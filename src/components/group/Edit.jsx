
import {GroupStore} from "../../stores";
import {GroupActions} from "../../actions";

import Header from "../Header.jsx";
import Form from "./Form.jsx";

import { Grid } from "react-bootstrap";
import { Paper } from "../controls";

export default class GroupCreate extends React.Component {

  constructor(props) {
    super(props);

    this.state = GroupCreate.defaultState;
    this.props.id = (this.props.params && this.props.params.groupId) || null;
  }

  componentDidMount(){
    let model = {
      title: "",
      description: ""
    };

    if (this.props.id){
      model = GroupStore.getStateById(this.props.id);
      this.evChangeGroup = GroupStore.addListener(this.onChangeGroup.bind(this));
    }

    this.setState({ model });
  }

  componentWillUnmount() {
    if (this.evChangeGroup){
      this.evChangeGroup.remove();
    }
  }

  onChangeGroup(){
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
      if (this.props.id){
        GroupActions.update(this.props.id, this.state.model);
      }
      else {
        GroupActions.create(this.state.model);
      }
    }

    this.setState({ model: {} });
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
  model: {},
  dirty: false
};
GroupCreate.defaultProps = {
  id: null
};
