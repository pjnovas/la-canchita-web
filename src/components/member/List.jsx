import {Link} from 'react-router';
import MembersStore from '../../stores/Members';
import MemberItem from './Item.jsx';

export default class MemberList extends React.Component {

  componentDidMount() {

    this.props.collection.on('add remove reset', () => {
      this.setState({ collection: this.props.collection });
    });

  }

  componentWillUnmount() {
    this.props.collection.off('add remove reset', null, this);
  }

  render() {
    var list = this.props.collection;
    return (
      <div className="members">
        <ul className="media-list">
        {this.props.collection.map(model => {
          return <MemberItem key={model.get('id')} model={model} />;
        })}
        </ul>
      </div>
    );
  }

};

MemberList.displayName = 'MemberList';
MemberList.propTypes = {
  collection: React.PropTypes.instanceOf(MembersStore).isRequired
};

/*
<div className="media media-buttons">
  <Link to="newgroup" className="pull-right">Invitar</Link>
</div>
*/