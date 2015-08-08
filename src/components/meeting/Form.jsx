
import { Input, Button, Row, Col } from "react-bootstrap";
import { Icon, Divider, DatePicker, Period } from "../controls";

export default class MeetingForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.showLimits = (this.props.min > 0 || this.props.max > 0 ? true : false);
  }

  changeField(prop, value){
    this.props.onChange({ [prop]: value });
  }

  changeConfirmRate(confirm, prop, value){
    this.props[confirm][prop] = value;
    this.props.onChange({ [confirm]: this.props[confirm] });
  }

  changeState(prop, value){
    this.setState({ [prop]: value });
  }

  toggleLimits(e, toggled){
    this.setState({ showLimits: toggled });
  }

  save(){
    this.props.onSave();
  }

  render() {
    let confirmStart, confirmEnd;

    if (this.props.confirmation){
      if (!this.props.when){
        this.props.when = moment().add(7, 'days');
      }

      confirmStart =
        moment(this.props.when)
        .subtract(this.props.confirmStart.times, this.props.confirmStart.period);

      confirmEnd =
        moment(this.props.when)
        .subtract(this.props.confirmEnd.times, this.props.confirmEnd.period);
    }

    //TODO: place:
    // https://developers.google.com/maps/documentation/javascript/examples/places-searchbox

    return (
      <form>

        <Row>
          <Col xs={12}>
            <h1>{this.props.formTitle}</h1>
          </Col>
        </Row>

        <Divider/>

        <Row>
          <Col xs={6}>

            <Input type="text" label={__.meeting_place}
              placeholder={__.meeting_place_hint}
              onChange={e => { this.changeField("place", e.target.value); }}
              value={this.props.place} />

            <Icon name="place" />

          </Col>

          <Col xs={3}>
            <DatePicker label={__.meeting_when_date} value={this.props.when}
              format={__.date_format}
              onChange={ value => { this.changeField("when", value); }} />
          </Col>

          <Col xs={3}>
            <DatePicker label={__.meeting_when_time} value={this.props.when}
              format={__.time_format}
              onChange={ value => { this.changeField("when", value); }}/>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>

            <Input type="text" label={__.meeting_title}
              placeholder={__.meeting_title_hint}
              onChange={e => { this.changeField("title", e.target.value); }}
              value={this.props.title} />

          </Col>
        </Row>

        <Row>
          <Col xs={12}>

            <Input type="textarea" label={__.meeting_info} rows="3"
              placeholder={__.meeting_info_hint}
              onChange={e => { this.changeField("info", e.target.value); }}
              value={this.props.description} />

          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Input type="checkbox" label={__.meeting_has_confirmation}
              checked={this.props.confirmation ? true : false }
              onChange={ (e) => { this.changeField("confirmation", e.target.checked); } }/>
          </Col>
        </Row>

        { this.props.confirmation ?
        <div>
          <Period label={__.meeting_when_confirm_start_label}
            tailLabel={__.meeting_when_confirm_end_tail}
            times={this.props.confirmStart.times}
            period={this.props.confirmStart.period}
            beforeDate={this.props.when}
            onChange={ (period, value) => { this.changeConfirmRate("confirmStart", period, value); }}/>

          <Period label={__.meeting_when_confirm_end_label}
            tailLabel={__.meeting_when_confirm_end_tail}
            times={this.props.confirmEnd.times}
            period={this.props.confirmEnd.period}
            beforeDate={this.props.when}
            onChange={ (period, value) => { this.changeConfirmRate("confirmEnd", period, value); }}/>

          <Row>
            <Col xs={5} xsOffset={1} className="text-center">
            {__.meeting_when_confirm_start_label + ": " + moment(confirmStart).format(__.full_datetime_format)}
            </Col>
            <Col xs={5} className="text-center">
            {__.meeting_when_confirm_end_label + ": " + moment(confirmEnd).format(__.full_datetime_format)}
            </Col>
          </Row>

        </div>
        : null }

        <Divider/>

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

MeetingForm.defaultProps = {
  confirmStart: { times: 2, period: "days" },
  confirmEnd: { times: 2, period: "hours" }
};



/*

  <div>
          <Row>
            <Col xs={2} xsOffset={1} className="text-vcenter">
              Inicio
            </Col>
            <Col xs={2}>
              <Input type="text" value={this.state.confirmFrom || 2}
                onChange={e => { this.changeConfirmation('confirmFrom', e.target.value); }} />
            </Col>
            <Col xs={4}>
              <Input type='select'
                onChange={ e => { this.changeConfirmation('confirmFromPeriod', e.target.value); } }>
              { periods.map( period => {
                  return (<option key={period.id} value={period.id}>{period.name}</option>);
                })
              }
              </Input>
            </Col>
            <Col xs={2} className="text-vcenter">
              antes
            </Col>
          </Row>
          <Row>
            <Col xs={2} xsOffset={1} className="text-vcenter">
              Fin
            </Col>
            <Col xs={2}>
              <Input type="text" value={this.state.confirmTo || 2}
                onChange={e => { this.changeConfirmation('confirmTo', e.target.value); }} />
            </Col>
            <Col xs={4}>
              <Input type='select'
                onChange={ e => { this.changeConfirmation('confirmToPeriod', e.target.value); } }>
              { periods.map( period => {
                  return (<option key={period.id} value={period.id}>{period.name}</option>);
                })
              }
              </Input>
            </Col>
            <Col xs={2} className="text-vcenter">
              antes
            </Col>
          </Row>
        </div>

*/




/*


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