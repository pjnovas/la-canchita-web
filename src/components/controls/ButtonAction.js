
import {Link} from 'react-router';
import Icon from './Icon';

export default class ButtonAction extends React.Component {

  render() {
    if (this.props.hidden){
      return null;
    }

    var css = 'btn-floating btn-large ';

    var icon = () => {
      return (<Icon large={true} name={this.props.icon} />);
    };

    return (
      <div className="fixed-action-btn">

        { this.props.to ?

          <Link to={this.props.to} params={this.props.params} className={css}>
            {icon()}
          </Link>
          :
          <a className={css} onClick={ e => { this.props.onClick(e); }}>
            {icon()}
          </a>
        }

      </div>
    );
  }

};

ButtonAction.displayName = 'ButtonAction';