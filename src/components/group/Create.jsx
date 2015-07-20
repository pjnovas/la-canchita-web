
import GroupStore from '../../stores/Group';
import GroupActions from '../../actions/Group';

import Header from '../Header.jsx';
import Form from './Form.jsx';

import Events from '../Events';
import shortid from 'shortid';

export default class GroupCreate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    this.isDirty = false;
    this.cid = shortid.generate();
  }

  redirect(gid){
    if (gid){
      window.app.router.transitionTo('group', { groupId: gid });
      return;
    }

    window.app.router.transitionTo('groups');
  }

  componentDidMount() {
    Events.attach(this.cid, this, GroupStore);
  }

  componentWillUnmount() {
    Events.detach(this.cid);
  }

  onStartCreate() {
    this.setState({ saving: true });
  }

  onEndCreate(group) {
    this.setState({ saving: false });
    this.redirect(group.id);
  }

  onErrorCreate(err) {
    this.setState({ saving: false });
    this.setState({ error: err });
  }

  onSave() {
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
