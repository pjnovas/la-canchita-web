
export default class Icon extends React.Component {

  render() {
    var large = this.props.large ? 'large' : '';
    var css = large + ' material-icons ' + this.props.css || '';

    return (
      <i className={css}>
        {this.props.name}
      </i>
    );
  }

};

Icon.displayName = 'Icon';
