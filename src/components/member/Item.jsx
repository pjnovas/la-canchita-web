
import {Link} from 'react-router';

export default class MemberItem extends React.Component {

  render() {
    var model = this.props.model;
    var style = { backgroundImage: 'url(' + model.user.picture + ')' };

    return (
      <li className="collection-item avatar">
        <img src={model.user.picture} className="circle" />
        <span className="title">{model.user.name}</span>
        <p>{model.role}</p>
        <a href="#!" className="secondary-content">
          <i className="material-icons">grade</i>
        </a>
      </li>
    );
  }

};

MemberItem.displayName = 'MemberItem';
