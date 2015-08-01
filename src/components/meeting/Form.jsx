
import { Paper, FlatButton, FontIcon, RaisedButton, TextField,
  DatePicker, TimePicker, Checkbox, Toggle } from "material-ui";

export default class MeetingForm extends React.Component {

  constructor(props) {
    super(props);
  }

  changeField(prop, value){
    this.props.onChange({ [prop]: value });
  }

  save(){
    this.props.onSave();
  }

  render() {
    var css = Theme.css;
    var iconcss = Theme.merge("raisedButtonLink", "right");

    var today = new Date();

    return (

      <Paper zDepth={1} rounded={true} style={css.form}>

        <h1>{this.props.formTitle}</h1>
        <div className="divider"></div>

        <TextField floatingLabelText={__.meeting_title}
          fullWidth={true}
          hintText={__.meeting_title_hint}
          onChange={e => { this.changeField('title', e.target.vale); }}
          value={this.props.title} />

        <TextField floatingLabelText={__.meeting_info} multiLine={true}
          fullWidth={true} rows={3}
          hintText={__.meeting_info_hint}
          onChange={e => { this.changeField('info', e.target.vale); }}
          value={this.props.info} />

        <TextField floatingLabelText={__.meeting_place} fullWidth={true}
          hintText={__.meeting_place_hint}
          onChange={e => { this.changeField('place', e.target.vale); }}
          value={this.props.place} />

        <div className="half-width-control">
          <DatePicker hintText={__.meeting_when_date_hint} autoOk={true}
            minDate={today} />
        </div>

        <div className="half-width-control">
          <TimePicker format="24hr" hintText={__.meeting_when_time_hint} />
        </div>

        <Toggle label={__.meeting_replacements}/>

        <div className="meeting-confirmation">
          <Toggle label={__.meeting_has_confirmation}/>

          <div className="half-width-control">
            <DatePicker hintText={__.meeting_when_confirm_start_hint} autoOk={true}
              minDate={today} />
          </div>

          <div className="half-width-control">
            <TimePicker format="24hr"/>
          </div>

          <div className="half-width-control">
            <DatePicker hintText={__.meeting_when_confirm_end_hint} autoOk={true}
              minDate={today} />
          </div>

          <div className="half-width-control">
            <TimePicker format="24hr" />
          </div>
        </div>

        <div className="meeting-limits">
          <Toggle label={__.meeting_has_limit}/>

          <div className="half-width-control">
            <TextField floatingLabelText={__.meeting_min} fullWidth={true}
              hintText="0" value={this.props.min}
              onChange={e => { this.changeField('min', e.target.vale); }} />
          </div>

          <div className="half-width-control">
            <TextField floatingLabelText={__.meeting_max} fullWidth={true}
              hintText="0" value={this.props.max}
              onChange={e => { this.changeField('max', e.target.vale); }} />
          </div>

        </div>

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

MeetingForm.displayName = "MeetingForm";
