
import GroupsStore from '../../stores/Groups';
import GroupActions from '../../actions/Group';

import Header from '../Header.jsx';
import Form from './Form.jsx';

export default class GroupCreate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    this.isDirty = false;
  }

  redirect(gid){
    if (gid){
      window.app.router.transitionTo('group', { groupId: gid });
      return;
    }

    window.app.router.transitionTo('groups');
  }

  componentDidMount() {

    GroupsStore

      .on('start:create', () => {
        this.setState({ saving: true });
      }, this)

      .on('end:create', (group) => {
        this.setState({ saving: false });
        this.redirect(group.id);
      }, this)

      .on('error:create', (model, err) => {
        this.setState({ saving: false });
        this.setState({ error: err });
      }, this);

  }

  componentWillUnmount() {
    GroupsStore.off(null, null, this);
  }

  onSave() {

    if (!this.isDirty){
      this.redirect();
      return;
    }

    GroupActions.create(this.state);

    this.setState({ loading: true });
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
            loading={ this.state.saving }
            onChange={ model => { this.onChange(model); }}
            onSave={ model => { this.onSave(model); }}
            onCancel={ () => { this.onCancel(); }} />

        </div>

      </div>
    );
  }

};

GroupCreate.displayName = 'GroupCreate';
