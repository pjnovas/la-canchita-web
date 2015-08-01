
import MeetingStore from "../../stores/Meeting";
import MeetingActions from "../../actions/Meeting";

import Header from "../Header.jsx";
import Form from "./Form.jsx";

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

    MeetingActions.update(this.state);
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
        <Header title="Editar Partido"
          backto="meeting"
          backparams={ { meetingId: this.state.id }} />

        <div className="row">

          {this.state.loading ? "Cargando ..." :

            <Form
              loading={ this.state.saving }

              title={ this.state.title }
              description={ this.state.description }
              picture={ this.state.picture }

              onChange={ model => { this.onChange(model); }}
              onSave={ model => { this.onSaveClick(model); }}
              onCancel={ () => { this.onCancel(); }} />
          }

        </div>

      </div>
    );
  }

};

MeetingEdit.displayName = "MeetingEdit";
