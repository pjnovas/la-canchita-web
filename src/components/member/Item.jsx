
import Member from '../../models/Member';
import {Link} from 'react-router';

export default class MemberItem extends React.Component {

  componentDidMount() {
    //this.props.model.on('change', () => {
    //  this.setState({ model: this.props.model });
    //});
  }

  componentWillUnmount() {
    //this.props.model.off('change', null, this);
  }

  render() {
    var model = this.props.model, _model = model.toJSON();
    var style = { backgroundImage: 'url(' + _model.user.picture + ')' };

    return (
      <li className="collection-item avatar">
        <img src={_model.user.picture} className="circle" />
        <span className="title">{_model.user.name}</span>
        <p>{_model.roleName}</p>
        <a href="#!" className="secondary-content">
          <i className="material-icons">grade</i>
        </a>
      </li>
    );
  }

};

MemberItem.displayName = 'MemberItem';
