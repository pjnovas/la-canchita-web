
import { Button } from "react-bootstrap";
import { ButtonLink } from "react-router-bootstrap";
import Icon from "./Icon";

export default class ActionButton extends React.Component {

  render() {

    let icon = (<Icon name={this.props.icon} />);
    this.props.className = "btn-action";

    let button = (<Button {...this.props}>{icon}</Button>);

    if (this.props.to){ // router link
      button = (<ButtonLink {...this.props}>{icon}</ButtonLink>);
    }

    return (button);
  }

};

ActionButton.displayName = "ActionButton";
