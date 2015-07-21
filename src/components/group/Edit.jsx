
import GroupStore from '../../stores/Group';
import GroupActions from '../../actions/Group';

import Header from '../Header.jsx';
import Form from './Form.jsx';

import ReactListener from '../ReactListener';

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

  onEndFind(group) {
    super.onEndFind();
    this.setState(group);
  }

  onEndSave() {
    this.redirect();
  }

  redirect(){
    window.app.router.transitionTo('group', { groupId: this.state.id });
  }

  onSave() {

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
        <Header title="Editar Grupo"
          backto="group"
          backparams={ { groupId: this.state.id }} />

        <div className="row">

          {this.state.loading ? 'Cargando ...' :

            <Form
              loading={ this.state.saving }

              title={ this.state.title }
              description={ this.state.description }
              picture={ this.state.picture }

              onChange={ model => { this.onChange(model); }}
              onSave={ model => { this.onSave(model); }}
              onCancel={ () => { this.onCancel(); }} />
          }

        </div>

      </div>
    );
  }

};

GroupEdit.displayName = 'GroupEdit';
