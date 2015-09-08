
import { MeetingStore, GroupStore } from "../../stores";
import { MeetingActions, GroupActions } from "../../actions";

import Header from "../Header.jsx";
import Form from "./Form.jsx";

import { Grid } from "react-bootstrap";
import { Paper } from "../controls";

export default class MeetingCreate extends React.Component {

  constructor(props) {
    super(props);

    this.state = MeetingCreate.defaultState;

    let ps = this.props.params;
    this.state.groupId = ps.groupId;

    if (ps.cloneId){
      this.state.cloneId = ps.cloneId;
    }
    else if (ps.meetingId){
      this.state.model.id = ps.meetingId;
    }
  }

  componentDidMount(){
    this.evChangeMeeting = MeetingStore.addListener(this.onChangeMeeting.bind(this));
    this.evChangeGroup = GroupStore.addListener(this.onChangeGroup.bind(this));

    let mid = this.state.model.id || this.state.cloneId || null;
    if (mid) {
      MeetingActions.findOne(mid);
    }
  }

  componentWillUnmount() {
    this.evChangeMeeting.remove();
    this.evChangeGroup.remove();
  }

  onChangeMeeting(){
    let cloning = this.state.cloneId ? true : false;
    let mid = this.state.model.id || this.state.cloneId || null;

    if (this.state.loading && mid){
      let meeting = MeetingStore.getStateById(mid);

      if (cloning){
        delete meeting.id;
        delete meeting.attendees;
        delete meeting.group;

        meeting.when = MeetingCreate.defaultState.model.when;
      }

      this.setState({ model: meeting, loading: false });
      return;
    }

    if (this.state.saving){
      this.redirect();
    }
  }

  onChangeGroup() {
    // meeting created
    this.redirect();
  }

  redirect(){
    if (this.state.model.id){
      window.app.router.transitionTo("meeting", { meetingId: mid });
      return;
    }

    window.app.router.transitionTo("grouptab", { groupId: this.state.groupId, tab: "meetings" });
  }

  onSaveClick() {
    if (!this.state.isDirty){
      this.redirect();
      return;
    }

    this.setState({ saving: true });

    if (this.state.model.id){
      MeetingActions.update(this.state.model.id, this.state.model);
      return;
    }

    GroupActions.createMeeting(this.state.groupId, this.state.model);
  }

  onChange(prop, value){
    let model = this.state.model;
    model[prop] = value;
    this.setState({ model, isDirty: true });
  }

  onCancel() {
    this.redirect();
  }

  render() {
    this.state.model.when = moment(this.state.model.when);

    return (
      <div>
        <Header backto="grouptab" backparams={{ groupId: this.state.groupId, tab: "meetings" }} />

        <Grid>
          <Paper skipHeader>

            <Form
              {...this.state.model}
              formTitle={this.state.model.id ? __.meeting_title_edit : __.meeting_title_create}

              onChange={ (prop, value) => this.onChange(prop, value) }
              onSave={ () => { this.onSaveClick(); }}
              onCancel={ () => { this.onCancel(); }} />

          </Paper>
        </Grid>

      </div>
    );
  }

};

MeetingCreate.displayName = "MeetingCreate";
MeetingCreate.defaultState = {
  model: {
    title: "",
    when: moment().add(7, 'days'),
    duration: { times: 1, period: "hours" },
    confirmation: false,
    confirmStart: { times: 2, period: "days" },
    confirmEnd: { times: 2, period: "hours" },
    replacements: false,
  },

  loading: true,
  isDirty: false,
  saving: false,

  cloneId: null,
  groupId: null
};

/*
formTitle={__.meeting_title_create}

title={ this.state.title }
info={ this.state.info }
place={ this.state.place }
location={ this.state.location }
when={ moment(this.state.when) }
duration={ this.state.duration }

confirmation={ this.state.confirmation }
confirmStart={ this.state.confirmStart }
confirmEnd={ this.state.confirmEnd }

replacements={ this.state.replacements }

min={ this.state.min }
max={ this.state.max }

*/
