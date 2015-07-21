import Events from './Events';
import shortid from 'shortid';

export default class ReactListener extends React.Component {

  constructor(props) {
    super(props);

    this.cid = shortid.generate();
    this.store = null;

    this.state = {
      loading: false,
      creating: false,
      saving: false,
      destroying: false,
      error: null
    };
  }

  componentDidMount() {
    if (this.store){
      Events.attach(this.cid, this, this.store);
    }
  }

  componentWillUnmount() {
    if (this.store){
      Events.detach(this.cid);
    }
  }

  // Finding

  onBeforeFind() {
    this.setState({ loading: true });
  }

  onFind() {
    this.setState({ loading: false });
  }

  // Creating

  onBeforeCreate() {
    this.setState({ creating: true });
  }

  onCreate() {
    this.setState({ creating: false });
  }

  // Updating

  onBeforeSave() {
    this.setState({ saving: true });
  }

  onSave() {
    this.setState({ saving: false });
  }

  // Destroying

  onBeforeDestroy() {
    this.setState({ destroying: true });
  }

  onDestroy() {
    this.setState({ destroying: false });
  }

  // Errors

  onError(err) {
    var state = {
      error: err
    };

    switch (err.type){
      case 'find': state.loading = false; break;
      case 'create': state.creating = false; break;
      case 'save': state.saving = false; break;
      case 'destroy': state.destroying = false; break;
    }

    this.setState(state);
  }

};