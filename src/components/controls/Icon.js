
export default class Icon extends React.Component {

  render() {
    return (
      <i className={"icon icon-" + this.props.name}></i>
    );
  }

};

Icon.displayName = "Icon";
