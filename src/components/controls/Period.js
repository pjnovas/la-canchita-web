
import moment from "moment";
import { Row, Col, Input } from "react-bootstrap";

export default class Period extends React.Component {

  onChangeTimes(times){
    this.props.onChange("times", +times);
  }

  onChangePeriod(type){
    this.props.onChange("period", type);
  }

  render() {
    let periods = this.props.periods || [ "weeks", "days", "hours", "minutes"];
    let labelSize = this.props.tailLabel ? 2 : 4;

    return (
      <Row>

        <Col xs={labelSize} xsOffset={1} className="text-vcenter">
          {this.props.label}
        </Col>

        <Col xs={2}>
          <Input type="number" value={this.props.times} className="number-00"
            onChange={e => { this.onChangeTimes(e.target.value); }} />
        </Col>

        <Col xs={4}>
          <Input type="select" value={this.props.period} min={0} max={99} maxLength={2}
            onChange={ e => { this.onChangePeriod(e.target.value); } }>
          }
          { periods.map( period => {
              return (<option key={period} value={period}>{__["periods_" + period]}</option>);
            })
          }
          </Input>
        </Col>

        {this.props.tailLabel ?
        <Col xs={2} className="text-vcenter">
          {this.props.tailLabel}
        </Col>
        : null}

      </Row>
    );
  }

};

Period.displayName = "Period";
