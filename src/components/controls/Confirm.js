
import { Button, Modal } from "react-bootstrap";
import { Icon } from "./Icon";

export default class Confirm extends React.Component {

  render() {

    return (
      <Modal show={true} onHide={this.props.onClose}>

        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <p>{this.props.text}</p>

        </Modal.Body>

        <Modal.Footer>

          <Button bsStyle="link" onClick={this.props.onClose}>{__.cancel}</Button>

           <Button bsStyle="link" className="btn-success pull-right"
              onClick={ () => this.props.onAccept() } >
            {__.accept}
          </Button>

        </Modal.Footer>

      </Modal>
    );
  }

};

Confirm.displayName = "Confirm";
