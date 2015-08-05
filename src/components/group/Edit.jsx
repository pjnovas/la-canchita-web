
import GroupStore from "../../stores/Group";
import GroupActions from "../../actions/Group";

import Header from "../Header.jsx";
import Form from "./Form.jsx";

import { Grid } from "react-bootstrap";
import { Paper } from "../controls";

import ReactListener from "../ReactListener";

export default class GroupEdit extends ReactListener {

  constructor(props) {
    super(props);

    this.state.id = this.props.params.groupId;
    this.isDirty = false;
    this.store = GroupStore;
  }

  componentDidMount() {
    super.componentDidMount();
    GroupActions.findOne(this.state.id);
  }

  onFind(group) {
    super.onFind();
    this.setState(group);
  }

  onSave() {
    this.redirect();
  }

  redirect(){
    window.app.router.transitionTo("group", { groupId: this.state.id });
  }

  onSaveClick() {

    if (!this.isDirty){
      this.redirect();
      return;
    }

    GroupActions.update(this.state);
  }

  onChange(model){
    this.isDirty = true;
    this.setState(model);
  }

  onCancel() {
    this.redirect();
  }

  render() {

    return (
      <div>
        <Header backto="group" backparams={ { groupId: this.state.id }} />

        <Grid>

        {this.state.loading ? __.loading :

          <Paper skipHeader>
            <Form
              formTitle={__.group_title_edit}
              loading={ this.state.saving }

              title={ this.state.title }
              description={ this.state.description }
              picture={ this.state.picture }

              onChange={ model => { this.onChange(model); }}
              onSave={ model => { this.onSaveClick(model); }}
              onCancel={ () => { this.onCancel(); }} />

          </Paper>
        }

        </Grid>
      </div>
    );
  }

};

GroupEdit.displayName = "GroupEdit";
