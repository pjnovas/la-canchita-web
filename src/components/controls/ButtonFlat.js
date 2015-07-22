
export default class ButtonFlat extends React.Component {

  render() {
    if (this.props.hidden){
      return null;
    }

    var defaultCSS = 'waves-effect waves-teal btn-flat ';
    var css = defaultCSS + this.props.css;

    return (
      <a className={ css }
        onClick={ e => { this.props.onClick(e); } }>{ this.props.text }</a>
    );
  }

};

ButtonFlat.displayName = 'ButtonFlat';
