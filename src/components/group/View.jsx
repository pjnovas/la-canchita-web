
import GroupStore from '../../stores/Group';
import GroupActions from '../../actions/Group';

import MemberList from '../member/List.jsx';
import Header from '../Header.jsx';

import {Link} from 'react-router';

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

    var navs = [{
      to: 'groupedit',
      params: { groupId: _model.id },
      icon: 'fa-futbol-o'
    }, {
      to: 'groupedit',
      params: { groupId: _model.id },
      icon: 'fa-group'
      //icon: 'fa-user-plus'
    }, {
      to: 'groupedit',
      params: { groupId: _model.id },
      icon: 'fa-pencil'
    }];

    return (
      <div>
        <Header backto="groups" navs={navs} />

        <div className="inner group-view">
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

            <a className="info" data-toggle="collapse" href="#more-info">
              <i className="fa fa-info"></i>
            </a>

          </div>

          <div id="more-info" className="collapse">
            <p className="description">{_model.description}</p>
          </div>

          <div className="list-container">
            <div className="head">
              <h3>Jugadores</h3>
            </div>
            {members ? <MemberList collection={members} /> : ''}
          </div>

        </div>
      </div>
    );
  }

};

GroupView.displayName = 'GroupView';
/*

<div className="list-container">
  <div className="head">
    <h3>Partidos</h3>
  </div>
  {members ? <MemberList collection={members} /> : ''}
</div>

*/