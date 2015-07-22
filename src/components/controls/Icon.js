
export default class Icon extends React.Component {

  render() {
    return (
      <i className="material-icons">{this.props.name}</i>
    );
  }

};

Icon.displayName = 'Icon';
