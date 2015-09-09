
import Dropzone from "react-dropzone";

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
      this.setState({ picture: null, error: __.group_picture_error_size });
      return;
    }

    if (["image/jpeg", "image/gif", "image/png"].indexOf(file.type) === -1){
      this.setState({ picture: null, error: __.group_picture_error_type });
      return;
    }

    this.setState({ picture: file, error: null });
    this.props.onChangePicture(file);
  }

  render() {

    var preview = null;

    if (this.state.picture) {
      preview = { backgroundImage: "url(" + this.state.picture.preview + ")" };
    }
    else if (this.props.picture){
      preview = { backgroundImage: "url(/images/groups/" + this.props.picture + ")" };
    }

    return (
      <div>
        <div className="group-picture">

          <Dropzone ref="dropzone" onDrop={e => { this.onDrop(e); }}>
            {(preview ? <div className="preview" style={preview} /> : null)}
            <div className="info">
              <p>{__.group_picture_msg_drop}</p>
            </div>
          </Dropzone>

        </div>

        {this.state.error ? <p className="pic-error-text">{this.state.error}</p> : null }
      </div>
    );
  }

};

GroupDropPicture.displayName = "GroupDropPicture";
