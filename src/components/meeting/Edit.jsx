
import MeetingStore from "../../stores/Meeting";
import MeetingActions from "../../actions/Meeting";

import Header from "../Header.jsx";
import Form from "./Form.jsx";

import { Grid } from "react-bootstrap";
import { Paper } from "../controls";

import ReactListener from "../ReactListener";

export default class MeetingEdit extends ReactListener {

  constructor(props) {
    super(props);

    this.state.id = this.props.params.meetingId;
    this.isDirty = false;
    this.store = MeetingStore;
  }

  componentDidMount() {
    super.componentDidMount();
    MeetingActions.findOne(this.state.id);
  }

  onFind(meeting) {
    super.onFind();
    this.setState(meeting);
  }

  onSave() {
    this.redirect();
  }

  redirect(){
    window.app.router.transitionTo("meeting", { meetingId: this.state.id });
  }

  onSaveClick() {

    if (!this.isDirty){
      this.redirect();
      return;
    }

    MeetingActions.update(this.state.group, this.state);
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
        <Header backto="meeting" backparams={ { meetingId: this.state.id }} />

        {this.state.loading ? __.loading :

        <Grid>
          <Paper skipHeader>
            <Form
              formTitle={__.meeting_title_edit}
              loading={ this.state.saving }

              title={ this.state.title }
              info={ this.state.info }
              place={ this.state.place }
              location={ this.state.location }
              when={ this.state.when }
              duration={ this.state.duration }

              confirmation={ this.state.confirmation }
              confirmStart={ this.state.confirmStart }
              confirmEnd={ this.state.confirmEnd }

              replacements={ this.state.replacements }

              min={ this.state.min }
              max={ this.state.max }

              onChange={ model => { this.onChange(model); }}
              onSave={ model => { this.onSaveClick(model); }}
              onCancel={ () => { this.onCancel(); }} />
          </Paper>
        </Grid>

        }

      </div>
    );
  }

};

MeetingEdit.displayName = "MeetingEdit";
