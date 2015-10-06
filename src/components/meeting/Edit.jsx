
import _ from "lodash";

import { MeetingStore, GroupStore } from "../../stores";
import { MeetingActions, GroupActions } from "../../actions";

import Header from "../Header.jsx";
import Form from "./Form.jsx";

import { Grid } from "react-bootstrap";
import { Paper } from "../controls";

export default class MeetingCreate extends React.Component {

  constructor(props) {
    super(props);

    this.state = _.cloneDeep(MeetingCreate.defaultState);

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
      let meeting = MeetingStore.getStateById(mid);

      if (!meeting){
        MeetingActions.findOne(mid);
        return;
      }

      this.onChangeMeeting();
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

        let defaults = _.cloneDeep(MeetingCreate.defaultState.model);
        meeting = _.defaultsDeep(meeting, defaults);
        meeting.when = defaults.when;
      }
      else {
        let stage = MeetingStore.getStage(mid);
        if (["cancelled", "historic", "running", "played"].indexOf(stage) > -1){
          // Cannot be edited > redirect
          setTimeout(() => window.app.router.transitionTo("meeting", { meetingId: mid }), 100);
        }
      }

      this.setState({ model: meeting, loading: false });
      return;
    }

    if (this.state.saving){
      setTimeout(() => this.redirect(), 100);
    }
  }

  onChangeGroup() {
    // meeting created
    setTimeout(() => this.redirect(), 100);
  }

  redirect(){
    //if (this.state.model.id){
    //  window.app.router.transitionTo("meeting", { meetingId: this.state.model.id });
    //  return;
    //}

    let gid = this.state.groupId || this.state.model.group && this.state.model.group.id;
    window.app.router.transitionTo("grouptab", { groupId: gid, tab: "meetings" });
  }

  isValid() {
    let model = this.state.model;
    if (!model.place || !model.location){
      window.alert('Es obligatorio ingresar un lugar');
      return false;
    }

    if (!model.when){
      window.alert('Es obligatorio ingresar una fecha');
      return false;
    }

    return true;
  }

  onSaveClick() {
    if (!this.state.isDirty){
      this.redirect();
      return;
    }

    if (!this.isValid()){
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
    let gid = this.state.groupId || this.state.model.group && this.state.model.group.id;
    this.state.model.when = moment(this.state.model.when);

    return (
      <div>
        { gid ?
        <Header backto="grouptab" backparams={{ groupId: gid, tab: "meetings" }} />
        : null }

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
    info: "",
    when: moment().add(7, 'days'),
    duration: { times: 1, period: "hours" },
    confirmation: false,
    confirmStart: { times: 2, period: "days" },
    confirmEnd: { times: 2, period: "hours" },
    min: 0,
    max: 0,
    replacements: false,
    cancelled: false
  },

  loading: true,
  isDirty: false,
  saving: false,

  cloneId: null,
  groupId: null
};
