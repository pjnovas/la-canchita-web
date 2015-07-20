
import Dropzone from 'react-dropzone';

export default class GroupDropPicture extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      picture: null
    };
  }

  onDrop(files) {
    var file = files[0];
    if (file.size > 300000){
      this.setState({ picture: null, error: 'La imagen no puede superar los 300 kb' });
      return;
    }

    if (['image/jpeg', 'image/gif', 'image/png'].indexOf(file.type) === -1){
      this.setState({ picture: null, error: 'Solo Imagenes .png .jpg o .gif' });
      return;
    }

    this.setState({ picture: file, error: null });
    this.props.onChangePicture(file);
  }

  render() {

    var preview = '';

    if (this.state.picture) {
      preview = { backgroundImage: 'url(' + this.state.picture.preview + ')' };
    }
    else if (this.props.picture){
      preview = { backgroundImage: 'url(/images/groups/' + this.props.picture + ')' };
    }

    var error = '';
    if (this.state.error){
      error = (
        <div className="col s12">
          <span className="red-text">{this.state.error}</span>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="group-picture">

          <Dropzone ref="dropzone" onDrop={e => { this.onDrop(e); }}>
            {(preview ? <div className="preview" style={preview} /> : '')}
            <div className="info center-align">Suelta una imagen o click para seleccionar.</div>
          </Dropzone>

        </div>

        {error}
      </div>
    );
  }

};

GroupDropPicture.displayName = 'GroupDropPicture';
