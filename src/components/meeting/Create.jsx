
import MeetingStore from '../../stores/Meeting';
import MeetingActions from '../../actions/Meeting';

import Header from '../Header.jsx';
import Form from './Form.jsx';

import ReactListener from '../ReactListener';

export default class MeetingCreate extends ReactListener {

  constructor(props) {
    super(props);

    this.state.gid = this.props.params.groupId;

    this.isDirty = false;
    this.store = MeetingStore;
  }

  redirect(mid){
    if (mid){
      window.app.router.transitionTo('meeting', { meetingId: mid });
      return;
    }

    window.app.router.transitionTo('group', { groupId: this.state.gid });
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
      <div className="meetings create">
        <Header title="Crear Grupo"
          backto="group" backparams={{ groupId: this.state.gid }} />

        <div className="row">

          <Form
            loading={ this.state.creating }
            onChange={ model => { this.onChange(model); }}
            onSave={ model => { this.onSaveClick(model); }}
            onCancel={ () => { this.onCancel(); }} />

        </div>

      </div>
    );
  }

};

MeetingCreate.displayName = 'MeetingCreate';
