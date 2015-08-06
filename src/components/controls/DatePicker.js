
import { Input } from "react-bootstrap";

export default class DatePicker extends React.Component {

  componentDidMount() {
    $("input", React.findDOMNode(this.refs.dpicker)).datetimepicker({
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
      }
    });
  }

  render() {
    return (
      <Input {...this.props} type="text" ref="dpicker" />
    );
  }

};

DatePicker.displayName = "DatePicker";
