
import GroupStore from '../stores/Group';
import GroupActions from '../actions/Group';

import MemberList from './MemberList.jsx';

export default class GroupView extends React.Component {

  constructor(props) {
    super(props);

    var group = new GroupStore({
      id: this.props.params.groupId
    });

    this.state = {
      model: group,
      loading: false
    };
  }

  componentDidMount() {

    this.state.model.on('change', () => {
      this.setState({ model: this.state.model });
    });

    this.state.model.fetch({
      parse: true,
      error: function(model, resp, options){
        window.app.handleError(resp.status, resp.responseText);
      }
    });
  }

  componentWillUnmount() {
    this.state.model.off('change', null, this);
  }

  render() {
    var model = this.state.model, _model = model.toJSON();
    var style = { backgroundImage: 'url(' + model.imageURL() + ')' };

    var members = model.get('members');

    return (
      <div className="group-view">
        <div className="header" style={style}>
          <h1>{_model.title}</h1>

          <div className="counters">
            <div>
              {model.count('members')}<i className="fa fa-group"></i>
            </div>
            <div>
              {model.count('meetups')}<i className="fa fa-futbol-o"></i>
            </div>
          </div>

        </div>

        <div>
          <p className="description">{_model.description}</p>
        </div>

        <div>
        {members ? <MemberList collection={members} /> : ''}
        </div>

      </div>
    );
  }

};

GroupView.displayName = 'GroupView';
