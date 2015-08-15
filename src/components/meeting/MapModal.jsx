
import { Button, Row, Col, Modal, Input } from "react-bootstrap";
import { GMap } from "../controls";

export default class MapModal extends React.Component {

  constructor(props){
    super(props);
    this.state = MapModal.defaultState;
  }

  onSelectPlace(place, location) {
    this.props.place = place;
    this.props.location = location;
  }

  onSave(){
    this.props.onSelect(this.props.place, this.props.location);
    this.props.onClose();
  }

  render() {
    let cssAll = this.state.loading ? "hidden" : "";
    let cssLoading = this.state.loading ? "" : "hidden";

    return (

      <Modal show={this.props.show} onHide={this.props.onClose}>

        <Modal.Header closeButton>
          <Modal.Title>{__.meeting_mapmodal_title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <span className={cssLoading}>{__.loading}</span>
          <div className={cssAll}>
            <GMap
              placeholder={__.meeting_mapmodal_searchbox}
              place={this.props.place}
              location={this.props.location}
              onReady={ () => { this.setState({ loading: false }) }}
              onChange={ (place, loc) => { this.onSelectPlace(place, loc); }} />
          </div>
        </Modal.Body>

        <Modal.Footer>

          <Button onClick={this.props.onClose}>{__.close}</Button>

           <Button bsStyle="success" className="pull-right"
              onClick={ e => { this.onSave(e); } } >
            {__.save}
          </Button>
        </Modal.Footer>

      </Modal>
    );
  }

};

MapModal.displayName = "MapModal";

MapModal.defaultState = {
  loading: true,
};
