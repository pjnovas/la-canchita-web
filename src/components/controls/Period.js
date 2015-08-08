
import moment from "moment";
import { Row, Col, Input } from "react-bootstrap";

export default class Period extends React.Component {

  onChangeTimes(times){
    this.props.onChange("times", times);
  }

  onChangePeriod(type){
    this.props.onChange("period", type);
  }

  render() {
    let periods = this.props.periods || [ "weeks", "days", "hours", "minutes"];

    return (
      <Row>

        <Col xs={2} xsOffset={1} className="text-vcenter">
          {this.props.label}
        </Col>

        <Col xs={2}>
          <Input type="text" value={this.props.times}
            onChange={e => { this.onChangeTimes(e.target.value); }} />
        </Col>

        <Col xs={4}>
          <Input type="select" value={this.props.period}
            onChange={ e => { this.onChangePeriod(e.target.value); } }>
          { periods.map( period => {
              return (<option key={period} value={period}>{__["periods_" + period]}</option>);
            })
          }
          </Input>
        </Col>

        <Col xs={2} className="text-vcenter">
          {this.props.tailLabel}
        </Col>

      </Row>
    );
  }

};

Period.displayName = "Period";
