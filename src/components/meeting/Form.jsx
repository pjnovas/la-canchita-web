
import { Input, Button, Row, Col } from "react-bootstrap";
import { Icon, Divider, DatePicker } from "../controls";

export default class MeetingForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.showLimits = (this.props.min > 0 || this.props.max > 0 ? true : false);
  }

  changeField(prop, value){
    this.props.onChange({ [prop]: value });
  }

  changeConfirmation(prop, value){
    //confirmFrom
    //confirmFromPeriod
    //confirmTo
    //confirmToPeriod
  }

  toggleLimits(e, toggled){
    this.setState({ showLimits: toggled });
  }

  save(){
    this.props.onSave();
  }

  render() {
    let today = new Date();

    let periods = [
      {id:"weeks", name:"Semanas"},
      {id:"days", name:'Días'},
      {id:"hours", name:'Horas'},
      {id:"minutes", name:'Minutos'}
    ];

    //TODO: place:
    // https://developers.google.com/maps/documentation/javascript/examples/places-searchbox

    return (
      <form>

        <Row>
          <Col xs={12}>
            <h1>{this.props.formTitle}</h1>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>

            <Input type="text" label={__.meeting_place}
              placeholder={__.meeting_place_hint}
              onChange={e => { this.changeField('place', e.target.value); }}
              value={this.props.place} />

            <Icon name="place" />

          </Col>

          <Col xs={3}>
            <DatePicker label={__.meeting_when_date} value={this.props.when} />
          </Col>

          <Col xs={3}>
            <Input type="text" label={__.meeting_when_time}
              value={this.props.when} />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>

            <Input type="text" label={__.meeting_title}
              placeholder={__.meeting_title_hint}
              onChange={e => { this.changeField('title', e.target.value); }}
              value={this.props.title} />

          </Col>
        </Row>

        <Row>
          <Col xs={12}>

            <Input type="textarea" label={__.meeting_info} rows="3"
              placeholder={__.meeting_info_hint}
              onChange={e => { this.changeField('info', e.target.value); }}
              value={this.props.description} />

          </Col>
        </Row>

        <Row>
          <Col xs={10} xsOffset={1} sm={6} smOffset={3}>

            <Button bsStyle="link" onClick={ e => {this.props.onCancel(e); } }>
              {__.cancel}
            </Button>

            <Button bsStyle="success" onClick={ e => { this.save(e); } } className="pull-right">
              {__.save}
            </Button>

          </Col>
        </Row>

      </form>
    );
  }

};

MeetingForm.displayName = "MeetingForm";

/*
<Paper zDepth={1} rounded={true} style={css.form}>

        <h1>{this.props.formTitle}</h1>
        <div className="divider"></div>

        <TextField floatingLabelText={__.meeting_title} fullWidth={true}
          hintText={__.meeting_title_hint}
          onChange={e => { this.changeField('title', e.target.value); }}
          value={this.props.title} />

        <TextField floatingLabelText={__.meeting_info} multiLine={true}
          fullWidth={true} rows={3}
          hintText={__.meeting_info_hint}
          onChange={e => { this.changeField('info', e.target.value); }}
          value={this.props.info} />

        <TextField floatingLabelText={__.meeting_place} fullWidth={true}
          hintText={__.meeting_place_hint} style={iconic}
          onChange={e => { this.changeField('place', e.target.value); }}
          value={this.props.place} />
        <FontIcon className="material-icons">place</FontIcon>

        <div className="half-width-control date-field" style={iconic}>
          <DatePicker hintText={__.meeting_when_date_hint} autoOk={true}
            minDate={today} />
        </div>

        <div className="half-width-control time-field">
          <TimePicker format="24hr" hintText={__.meeting_when_time_hint} />
        </div>

        <FontIcon className="material-icons">today</FontIcon>

        <Toggle label={__.meeting_has_confirmation} className="meeting-switch"
          value={this.props.confirmation}
          onToggle={ (e, toggled) => { this.changeField('confirmation', toggled); } }/>

        { this.props.confirmation ?
        <div className="meeting-confirmation">

          <FontIcon className="material-icons" style={iconMiddle}>event_available</FontIcon>
          <span style={ctrlLabel}>Inicio</span>
          <TextField fullWidth={true} style={minCtrl} className="input-center"
            value={this.state.confirmFrom || 2}
            onChange={e => { this.changeConfirmation('confirmFrom', e.target.value); }} />
          <SelectField className="fix-bs-select" fullWidth={true}
            floatingLabelText=" " style={midCtrl}
            valueMember="id" displayMember="name"
            value={this.state.confirmFromPeriod || "days"}
            onChange={ e => { this.changeConfirmation('confirmFromPeriod'); } }
            menuItems={periods} />
          <label style={minCtrl}>antes</label>

          <ClearFix/>

          <FontIcon className="material-icons" style={iconMiddle}>event_busy</FontIcon>
          <span style={ctrlLabel}>Fin</span>
          <TextField fullWidth={true} style={minCtrl} className="input-center"
            value={this.state.confirmTo || 2}
            onChange={e => { this.changeConfirmation('confirmTo', e.target.value); }} />
          <SelectField className="fix-bs-select" fullWidth={true}
            floatingLabelText=" " style={midCtrl}
            valueMember="id" displayMember="name"
            value={this.state.confirmToPeriod || "hours"}
            onChange={ e => { this.changeConfirmation('confirmToPeriod'); } }
            menuItems={periods} />
          <label style={minCtrl}>antes</label>

        </div>
        : null }

        <Toggle label={__.meeting_has_limit}  className="meeting-switch"
          value={this.state.showLimits}
          onToggle={ (e, toggled) => { this.toggleLimits(e, toggled); } }/>

        { this.state.showLimits ?
        <div className="meeting-limits">

          <div className="half-width-control number-field">
            <TextField floatingLabelText={__.meeting_min} fullWidth={true}
              hintText="0" value={this.props.min}
              onChange={e => { this.changeField('min', e.target.value); }} />
          </div>

          <div className="half-width-control number-field">
            <TextField floatingLabelText={__.meeting_max} fullWidth={true}
              hintText="0" value={this.props.max}
              onChange={e => { this.changeField('max', e.target.value); }} />
          </div>

          <Toggle label={__.meeting_replacements} className="meeting-switch"
            value={this.props.replacements}
            onToggle={ (e, toggled) => { this.changeField('replacements', toggled); } }/>

        </div>
        : null }

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
        */