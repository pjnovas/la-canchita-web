
import moment from "moment";
import { Input } from "react-bootstrap";

export default class DatePicker extends React.Component {

  componentDidMount() {
    $("input", React.findDOMNode(this.refs.dpicker)).datetimepicker({
      //defaultDate: moment(),
      locale: __.datepicker.locale,
      format: this.props.format,
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        previous: "fa fa-arrow-left",
        next: "fa fa-arrow-right",
        up: "fa fa-arrow-up",
        down: "fa fa-arrow-down",
        today: "fa fa-screenshot",
        clear: "fa fa-trash",
        close: "fa fa-remove"
      },
      tooltips: __.datepicker.tooltips
    })
    .on("dp.change", e => {
      this.props.onChange(e.date);
    });
  }

  componentDidUpdate(){
    if(this.refs.dpicker && this.props.value){
      $("input", React.findDOMNode(this.refs.dpicker))
        .data("DateTimePicker").date(this.props.value);
    }
  }

  render() {
    return (
      <Input {...this.props} type="text" ref="dpicker" />
    );
  }

};

DatePicker.displayName = "DatePicker";
