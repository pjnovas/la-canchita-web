
import {Link} from 'react-router';
import Icon from './Icon';

export default class Button extends React.Component {

  render() {
    if (this.props.hidden){
      return null;
    }

    var css = 'btn-large waves-effect waves-light ';
    css += this.props.css || '';

    if (this.props.loading){
      css += ' disabled';
    }

    var icon = () => {
      if (this.props.icon){
        var css = this.props.iconcss || 'right';
        return (<Icon name={this.props.icon} css={css} />);
      }
      return (<i></i>);
    };

    if (this.props.to){
      return (
        <Link to={this.props.to} params={this.props.params} className={css}>
          {this.props.text}
          {icon()}
        </Link>
      );
    }

    return (
      <a className={css} onClick={ e => { this.props.onClick(e); }}>

        { this.props.loading ? this.props.loadingText : this.props.text }

        { this.props.loading ?
          <div className="la-ball-atom la-2x left">
            <div></div><div></div><div></div><div></div>
          </div>
          : icon()
        }
      </a>
    );

  }

};

Button.displayName = 'Button';