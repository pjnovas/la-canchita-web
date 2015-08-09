
import MeetingStore from "../../stores/Meeting";
import MeetingActions from "../../actions/Meeting";

import Header from "../Header.jsx";
import Form from "./Form.jsx";

import { Grid } from "react-bootstrap";
import { Paper } from "../controls";

import ReactListener from "../ReactListener";

export default class MeetingCreate extends ReactListener {

  constructor(props) {
    super(props);

    this.state.gid = this.props.params.groupId;

    this.isDirty = false;
    this.store = MeetingStore;
  }

  redirect(mid){
    if (mid){
      window.app.router.transitionTo("meeting", { meetingId: mid });
      return;
    }

    window.app.router.transitionTo("group", { groupId: this.state.gid });
  }

  onCreate(meeting) {
    this.redirect(meeting.id);
  }

  onSaveClick() {
    if (!this.isDirty){
      this.redirect();
      return;
    }

    MeetingActions.create(this.state);
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
        <Header backto="group" backparams={{ groupId: this.state.gid, tab: "meetings" }} />

        <Grid>
          <Paper skipHeader>

            <Form
              formTitle={__.meeting_title_create}
              loading={ this.state.creating }

              title={ this.state.title }
              info={ this.state.info }
              place={ this.state.place }
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

      </div>
    );
  }

};

MeetingCreate.displayName = "MeetingCreate";
