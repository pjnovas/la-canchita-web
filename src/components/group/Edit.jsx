
import GroupStore from '../../stores/Group';
import GroupActions from '../../actions/Group';

import Header from '../Header.jsx';
import Form from './Form.jsx';

export default class GroupEdit extends React.Component {

  constructor(props) {
    super(props);

    this.store = GroupStore.instance;
    this.store.clear().set("id", this.props.params.groupId);

    this.state = {
      id: this.store.get('id'),
      loading: true,
      saving: false
    };

    this.isDirty = false;
  }

  componentDidMount() {

    this.store

      .on('end:fetch', () => {
        // form ready
        this.setState(this.store.toJSON());
        this.setState({ loading: false });
      }, this)

      .on('start:save', () => {
        this.setState({ saving: true });
      }, this)

      .on('end:save', () => {
        this.setState({ saving: false });
        this.redirect();
      }, this)

      .on('error:save', (model, err) => {
        this.setState({ saving: false });
        this.setState({ error: err });
      }, this)

      .fetch({ parse: true });
  }

  componentWillUnmount() {
    this.store.off(null, null, this);
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
