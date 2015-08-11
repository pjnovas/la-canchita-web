
import SelectPlace from "./MapModal.jsx";

import { Input, Button, Row, Col } from "react-bootstrap";
import { Icon, Divider, DatePicker, Period } from "../controls";

export default class MeetingForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = MeetingForm.defaultState;
    this.state.showLimits = (this.props.min > 0 || this.props.max > 0 ? true : false);
  }

  onClickPlace(){
    this.setState({ showSelectPlace: true });
  }

  hideSelectPlace(){
    this.setState({ showSelectPlace: false });
  }

  changeProp(prop, value){

    if (prop.indexOf("when") > -1){
      var type = prop.split("_")[1];
      var when = this.props.when;

      if(when && type === "date"){
        value.hours(when.hours()).minutes(when.minutes());
      }
      else if(when && type === "time"){
        value.date(when.date()).month(when.month()).year(when.year());
      }

      prop = "when";
    }

    this.props.onChange({ [prop]: value });
  }

  changePeriod(prop, type, value){
    this.props[prop][type] = value;
    this.props.onChange({ [type]: this.props[prop] });
  }

  changeState(prop, value){
    this.setState({ [prop]: value });
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

    //TODO: place map
    // https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
    // check lib https://github.com/tomchentw/react-google-maps

    return (
      <form>

        <Row>
          <Col xs={12}>
            <h1>{this.props.formTitle}</h1>
          </Col>
        </Row>

        <Divider/>

        <Row>
          <Col xs={8}>

            <Input type="text" label={__.meeting_place}
              placeholder={__.meeting_place_hint}
              onClick={ e => { this.onClickPlace(e); }}
              value={this.props.place && this.props.place.address || ""} />

          </Col>
        </Row>

        <Row>
          <Col xs={3} sm={2} md={2}>
            <DatePicker label={__.meeting_when_date} value={this.props.when}
              format={__.date_format} className="date"
              onChange={ value => { this.changeProp("when_date", value); }} />
          </Col>

          <Col xs={3} sm={2} md={2}>
            <DatePicker label={__.meeting_when_time} value={this.props.when}
              format={__.time_format} className="time"
              onChange={ value => { this.changeProp("when_time", value); }}/>
          </Col>

          <Col xs={6} sm={4} md={3} className="max-w160">
            <Period label={__.meeting_duration}
              times={this.props.duration.times}
              period={this.props.duration.period}
              onChange={ (period, value) => { this.changePeriod("duration", period, value); }}/>
          </Col>

        </Row>

        <Divider/>

        <Row>
          <Col xs={12}>
            <Input type="checkbox" label={__.meeting_more_info}
              checked={this.state.showMoreInfo ? true : false }
              onChange={ (e) => { this.changeState("showMoreInfo", e.target.checked); } }/>
          </Col>
        </Row>

        { this.state.showMoreInfo ?
        <div>
          <Row>
            <Col xs={12} sm={10} smOffset={1}>

              <Input type="text" label={__.meeting_title}
                placeholder={__.meeting_title_hint}
                onChange={e => { this.changeProp("title", e.target.value); }}
                value={this.props.title} />

            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={10} smOffset={1}>

              <Input type="textarea" label={__.meeting_info} rows="3"
                placeholder={__.meeting_info_hint}
                onChange={e => { this.changeProp("info", e.target.value); }}
                value={this.props.description} />

            </Col>
          </Row>
        </div>
        : null }

        <Divider/>

        <Row>
          <Col xs={12}>
            <Input type="checkbox" label={__.meeting_has_confirmation}
              checked={this.props.confirmation ? true : false }
              onChange={ (e) => { this.changeProp("confirmation", e.target.checked); } }/>
          </Col>
        </Row>

        { this.props.confirmation ?
        <div>
          <Row>

            <Col xs={5} xsOffset={1} className="max-w160">
              <Period label={__.meeting_when_confirm_start_label}
                times={this.props.confirmStart.times}
                period={this.props.confirmStart.period}
                onChange={ (period, value) => { this.changePeriod("confirmStart", period, value); }}/>
            </Col>
            <Col xs={5} className="max-w160">
              <Period label={__.meeting_when_confirm_end_label}
                times={this.props.confirmEnd.times}
                period={this.props.confirmEnd.period}
                onChange={ (period, value) => { this.changePeriod("confirmEnd", period, value); }}/>
            </Col>
          </Row>

          <Row>
            <Col xs={5} xsOffset={1} className="max-w160 text-center">
            {moment(confirmStart).format(__.full_datetime_format)}
            </Col>
            <Col xs={5} className="max-w160 text-center">
            {moment(confirmEnd).format(__.full_datetime_format)}
            </Col>
          </Row>

        </div>
        : null }

        <Divider/>

        <Row>
          <Col xs={12}>
            <Input type="checkbox" label={__.meeting_has_limit}
              checked={this.state.showLimits ? true : false }
              onChange={ (e) => { this.changeState("showLimits", e.target.checked); } }/>
          </Col>
        </Row>

        { this.state.showLimits ?
        <Row>
          <Col xs={3}>
            <Input type="number" label={__.meeting_min}
              placeholder={0} className="number-000" min={0} max={999} maxLength={3}
              onChange={e => { this.changeProp("min", e.target.value); }}
              value={this.props.min} />
          </Col>
          <Col xs={3}>
            <Input type="number" label={__.meeting_max}
              placeholder={0} className="number-000" min={0} max={999} maxLength={3}
              onChange={e => { this.changeProp("max", e.target.value); }}
              value={this.props.max} />
          </Col>

          <Col xs={6}>
            <Input type="checkbox" label={__.meeting_replacements}
              checked={this.props.replacements ? true : false }
              onChange={ (e) => { this.changeProp("replacements", e.target.checked); } }/>
          </Col>

        </Row>
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

        {this.state.showSelectPlace ?
        <SelectPlace
          show={this.state.showSelectPlace}
          place={this.props.place}
          onSelect={ place => { this.changeProp("place", place); } }
          onClose={ () => { this.hideSelectPlace(); } } />
        : null }

      </form>
    );
  }

};

MeetingForm.displayName = "MeetingForm";

MeetingForm.defaultProps = {
  duration: { times: 1, period: "hours" },
  confirmation: false,
  confirmStart: { times: 2, period: "days" },
  confirmEnd: { times: 2, period: "hours" },
  replacements: false,
};

MeetingForm.defaultState = {
  showLimits: false,
  showMoreInfo: false,
  showSelectPlace: false
};
