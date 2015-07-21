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

  onStartFind() {
    this.setState({ loading: true });
  }

  onEndFind() {
    this.setState({ loading: false });
  }

  onErrorFind(err) {
    this.setState({ loading: false });
    this.setState({ error: err });
  }

  // Creating

  onStartCreate() {
    this.setState({ creating: true });
  }

  onEndCreate() {
    this.setState({ creating: false });
  }

  onErrorCreate(err) {
    this.setState({ creating: false });
    this.setState({ error: err });
  }

  // Updating

  onStartSave() {
    this.setState({ saving: true });
  }

  onEndSave() {
    this.setState({ saving: false });
  }

  onErrorSave(err) {
    this.setState({ saving: false });
    this.setState({ error: err });
  }

  // Destroying

  onStartDestroy() {
    this.setState({ destroying: true });
  }

  onEndDestroy() {
    this.setState({ destroying: false });
  }

  onErrorDestroy(err) {
    this.setState({ destroying: false });
    this.setState({ error: err });
  }

};