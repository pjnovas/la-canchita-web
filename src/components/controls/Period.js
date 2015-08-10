
import moment from "moment";
import { Row, Col, Input, DropdownButton, MenuItem } from "react-bootstrap";

export default class Period extends React.Component {

  onChangeTimes(times){
    this.props.onChange("times", +times);
  }

  onChangePeriod(type){
    this.props.onChange("period", type);
  }

  render() {
    let periods = this.props.periods || [ "weeks", "days", "hours", "minutes"];

    let periodsBtn = (
      <DropdownButton title={__["periods_" + this.props.period]}>
        { periods.map( period => {
            return (
              <MenuItem key={period} value={period}
                onClick={ () => { this.onChangePeriod(period); }}>
              {__["periods_" + period]}
              </MenuItem>
            );
          })
        }
      </DropdownButton>
    );

    return (
      <Input type="number" label={this.props.label} value={this.props.times}
        onChange={e => { this.onChangeTimes(e.target.value); }}
        buttonAfter={periodsBtn} />
    );
  }

};

Period.displayName = "Period";
