
import MemberStore from '../../stores/Member';
import {Link} from 'react-router';

export default class MemberItem extends React.Component {

  componentDidMount() {
    this.props.model.on('change', () => {
      this.setState({ model: this.props.model });
    });
  }

  componentWillUnmount() {
    this.props.model.off('change', null, this);
  }

  render() {
    var model = this.props.model, _model = model.toJSON();
    var style = { backgroundImage: 'url(' + _model.user.picture + ')' };

    return (
      <li className="media">
        <div className="media-left media-middle media-pic" style={style}></div>
        <div className="media-body">
          <h4 className="name">{_model.user.name}</h4>
          <span className="role">{model.role()}</span>
        </div>
      </li>
    );
  }

};

MemberItem.displayName = 'MemberItem';
MemberItem.propTypes = {
  model: React.PropTypes.instanceOf(MemberStore).isRequired
};
