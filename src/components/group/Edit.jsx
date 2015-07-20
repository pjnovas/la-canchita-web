
import GroupsStore from '../../stores/Groups';
import GroupActions from '../../actions/Group';

import Header from '../Header.jsx';
import Form from './Form.jsx';

export default class GroupEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.params.groupId,
      loading: false,
      saving: false
    };

    this.isDirty = false;
  }

  componentDidMount() {

    GroupsStore

      .on('start:fetch', () => {
        this.setState({ loading: true });
      }, this)

      .on('end:fetch', () => {
        // form ready
        this.setState(GroupsStore.getOne(this.state.id));
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
      }, this);

    GroupsStore.fetchOne(this.state.id);
  }

  componentWillUnmount() {
    GroupsStore.off(null, null, this);
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
