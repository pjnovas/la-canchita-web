
import { Button, Row, Col, Modal, Input } from "react-bootstrap";
import Geosuggest from 'react-geosuggest';

const googleURL = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places";

export default class MapModal extends React.Component {

  constructor(props){
    super(props);
    this.state = MapModal.defaultState;
  }

  initialize() {
    let canvas = React.findDOMNode(this.refs.mapcanvas);

    this.map = new google.maps.Map(canvas, {
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // Buenos aires
    this.map.setCenter(new google.maps.LatLng(-34.597881,-58.453048));
    this.map.setZoom(12);

    this.setState({ loading: false });

    if (this.props.place){
      this.markPlace();
    }
  }

  componentWillMount(){

    //if (!window.google || !window.google.maps){
      this.initializing = true;

      window.initializeGMaps = this.initialize.bind(this);

      var script = window.document.createElement('script');
      script.type = 'text/javascript';
      script.src = googleURL + "&callback=initializeGMaps";
      window.document.body.appendChild(script);
    //}

  }

  componentDidMount() {
    if (!this.initializing){
      this.initialize();
    }
  }

  markPlace(){
    if (this.state.marker){
      this.state.marker.setMap(null);
    }

    let marker = new google.maps.Marker({
      map: this.map,
      position: this.props.place.location
    });

    this.setState({ marker });

    this.map.setCenter(this.props.place.location);
    this.map.setZoom(17);
  }

  onSuggestSelect(suggest){

    this.props.place = this.props.place || {};
    this.props.place.address = suggest.label;
    this.props.place.location = suggest.location;

    this.markPlace();
  }

  onSave(){
    this.props.onSelect(this.props.place);
    this.props.onClose();
  }

  render() {
    let cssAll = this.state.loading ? "hidden" : "";
    let cssLoading = this.state.loading ? "" : "hidden";

    let searchbox;
    if (!this.state.loading) {
      searchbox = (
        <Geosuggest
          placeholder={__.meeting_mapmodal_searchbox}
          initialValue={this.props.place && this.props.place.address || ""}
          onSuggestSelect={ suggest => { this.onSuggestSelect(suggest);} }
          googleMaps={window.google.maps}/>
        );
    }

    return (

      <Modal show={this.props.show} onHide={this.props.onClose}>

        <Modal.Header closeButton>
          <Modal.Title>{__.meeting_mapmodal_title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <span className={cssLoading}>{__.loading}</span>
          <div className={cssAll}>
            {searchbox}
            <div ref="mapcanvas" className="map-canvas"></div>
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
  search: "",
  marker: null
};
