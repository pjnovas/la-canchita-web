
import {Icon} from '../controls';

export default class MeetingItem extends React.Component {

  render() {
    //var model = this.props.model;

    return (
      <li className="collection-item avatar">
        <i className="material-icons circle red">play_arrow</i>
        <span className="title">Titulo de Meeting</span>
        <p>First Line <br/>
          Second Line
        </p>
        <a href="#!" className="secondary-content">
          <Icon name="grade" />
        </a>
      </li>
    );
  }

};

MeetingItem.displayName = 'MeetingItem';
