import {Link} from 'react-router';
import MemberItem from './Item.jsx';

export default class MemberList extends React.Component {

  render() {
    var list = this.props.collection;
    return (
      <div className="members">
        <ul className="collection">
        {this.props.collection.map(model => {
          return <MemberItem key={model.id} model={model} />;
        })}
        </ul>

        <div className="fixed-action-btn">
          <a className="btn-floating btn-large">
            <i className="large material-icons">person_add</i>
          </a>
          <ul>
            <li>
              <a className="btn-floating blue-grey darken-1">
                <i className="material-icons">person_outline</i>
              </a>
            </li>
            <li>
              <a className="btn-floating lime darken-2">
                <i className="material-icons">my_location</i>
              </a>
            </li>
            <li>
              <a className="btn-floating blue">
                <i className="material-icons">mail</i>
              </a>
            </li>
            <li>
              <a className="btn-floating">
                <i className="material-icons">add</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

};

MemberList.displayName = 'MemberList';
