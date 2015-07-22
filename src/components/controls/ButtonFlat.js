
export default class Icon extends React.Component {

  render() {
    return (
      <a className={ "waves-effect waves-teal btn-flat " + this.props.css }
        onClick={ e => { this.props.onClick(e); } }>{ this.props.text }</a>
    );
  }

};

Icon.displayName = 'Icon';
