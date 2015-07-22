
import {Icon} from '../controls';
export default class UserItem extends React.Component {

  render() {
    var model = this.props.model;

    return (
      <a onClick={ e => { this.props.onSelect(this.props.model); } }
        className="collection-item avatar">

        { model.isEmail ?
          <div className="circle">
            <Icon name="mail"/>
          </div>
          : <img src={model.picture} className="circle" />
        }
        <span className="title">{model.name}</span>
      </a>
    );
  }

};

UserItem.displayName = 'UserItem';
