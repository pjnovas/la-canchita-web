
import DropPicture from "./DropPicture.jsx";
import { Paper, FlatButton, FontIcon, RaisedButton, TextField } from "material-ui";

export default class GroupForm extends React.Component {

  constructor(props) {
    super(props);
  }

  changeTitle(e) {
    this.props.onChange({ title: e.target.value });
  }

  changeDescription(e) {
    this.props.onChange({ description: e.target.value });
  }

  changePicture(picture){
    this.props.onChange({ newpicture: picture });
  }

  save(){
    this.props.onSave();
  }

  render() {
    var css = Theme.css;
    var iconcss = Theme.merge("raisedButtonLink", "right");

    return (
      <Paper zDepth={1} rounded={true} style={css.form}>

        <h1>{this.props.formTitle}</h1>
        <div className="divider"></div>

        <DropPicture picture={this.props.picture}
          onChangePicture={ pic => { this.changePicture(pic); }} />

        <div className="divider"></div>

        <TextField floatingLabelText={__.group_title}
          fullWidth={true}
          hintText={__.group_title_hint}
          onChange={e => { this.changeTitle(e); }}
          value={this.props.title} />

        <TextField floatingLabelText={__.group_description} multiLine={true}
          fullWidth={true} rows={3}
          hintText={__.group_description_hint}
          onChange={e => { this.changeDescription(e); }}
          value={this.props.description} />

        <div style={css.buttonsSection}>
          <FlatButton label={__.cancel} default={true} linkButton={true}
            onClick={ e => { this.props.onCancel(e); } } style={css.left}>
          </FlatButton>

          <RaisedButton primary={true} label={__.save} style={css.right}
            onClick={ e => { this.save(e); } }>
            <FontIcon className="material-icons" style={iconcss}>check</FontIcon>
          </RaisedButton>
        </div>

      </Paper>
    );
  }

};

GroupForm.displayName = "GroupForm";
