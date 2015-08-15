
import Icon from "./Icon";
import Geosuggest from "react-geosuggest";
const googleURL = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places";

export default class GMap extends React.Component {

  constructor(props){
    super(props);
    this.state = GMap.defaultState;
  }

  componentWillMount(){

    if (!window.google || !window.google.maps){
      this.initializing = true;

      window.initializeGMaps = this.initialize.bind(this);

      var script = window.document.createElement("script");
      script.type = "text/javascript";
      script.src = googleURL + "&callback=initializeGMaps";
      window.document.body.appendChild(script);

      return;
    }

    this.initializing = false;
  }

  componentDidMount() {
    if (!this.initializing){
      // hack to make gmap render
      window.setTimeout(() => { this.initialize(); }, 100);
    }
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
    if (this.props.onReady){
      this.props.onReady();
    }

    if (this.props.place){
      this.markPlace();
    }
  }

  markPlace(){
    if (this.state.marker){
      this.state.marker.setMap(null);
    }

    var loc = {
      lat: this.props.location[0],
      lng: this.props.location[1]
    };

    let marker = new google.maps.Marker({
      map: this.map,
      position: loc
    });

    this.setState({ marker });

    google.maps.event.trigger(this.map, "resize");

    this.map.setCenter(loc);
    this.map.setZoom(17);
  }

  onSuggestSelect(suggest){
    this.props.place = suggest.label;
    this.props.location = [suggest.location.lat, suggest.location.lng];

    //this.props.onChange(suggest.label, [suggest.location.lat, suggest.location.lng]);
    this.props.onChange(this.props.place, this.props.location);

    this.markPlace();
  }

  render() {

    let searchbox;
    if (!this.props.readOnly && !this.state.loading) {
      searchbox = (
        <Geosuggest
          placeholder={this.props.placeholder}
          initialValue={this.props.place}
          onSuggestSelect={ suggest => { this.onSuggestSelect(suggest);} }
          googleMaps={window.google.maps}/>
        );
    }

    let link;
    if (this.props.place && this.props.readOnly){
      let label = this.props.place.replace(" ", "+");
      let loc = this.props.location;
      link = "http://maps.google.com/maps?q=" + label + "&z=17&ll=" + loc[0] + "," + loc[1];
    }

    return (
      <div>
        {this.props.readOnly ?
        <a href={link} target="_blank" className="map-location">
          <Icon name="map-marker"/><span>{this.props.place}</span>
        </a>
        : {searchbox} }
        <div ref="mapcanvas" className="map-canvas"></div>
      </div>
    );
  }

};

GMap.displayName = "GMap";

GMap.defaultState = {
  loading: true,
  search: "",
  marker: null
};
