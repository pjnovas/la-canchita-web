
import GroupStore from '../../stores/Group';
import GroupActions from '../../actions/Group';

import Header from '../Header.jsx';
import Form from './Form.jsx';

import ReactListener from '../ReactListener';

export default class GroupCreate extends ReactListener {

  constructor(props) {
    super(props);

    this.isDirty = false;
    this.store = GroupStore;
  }

  redirect(gid){
    if (gid){
      window.app.router.transitionTo('group', { groupId: gid });
      return;
    }

    window.app.router.transitionTo('groups');
  }

  onCreate(group) {
    this.redirect(group.id);
  }

  onSaveClick() {
    if (!this.isDirty){
      this.redirect();
      return;
    }

    GroupActions.create(this.state);
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
        <Header title="Crear Grupo" backto="groups" />

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

GroupCreate.displayName = 'GroupCreate';
