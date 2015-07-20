
import GroupStore from '../../stores/Group';
import GroupActions from '../../actions/Group';

import Header from '../Header.jsx';
import Form from './Form.jsx';

import Events from '../Events';
import shortid from 'shortid';

export default class GroupEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.params.groupId,
      loading: false,
      saving: false
    };

    this.isDirty = false;
    this.cid = shortid.generate();
  }

  componentDidMount() {
    Events.attach(this.cid, this, GroupStore);
    GroupStore.fetchOne(this.state.id);
  }

  componentWillUnmount() {
    Events.detach(this.cid);
  }

  onStartFetch() {
    this.setState({ loading: true });
  }

  onEndFetch() {
    this.setState(GroupStore.get(this.state.id));
    this.setState({ loading: false });
  }

  onStartSave() {
    this.setState({ saving: true });
  }

  onEndSave() {
    this.setState({ saving: false });
    this.redirect();
  }

  onErrorSave(err) {
    this.setState({ saving: false });
    this.setState({ error: err });
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
