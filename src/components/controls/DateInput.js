
export default class DateInput extends React.Component {

  componentDidMount() {
    $(React.findDOMNode(this.refs.date)).pickadate({
      selectMonths: true,
      selectYears: 3
    });
  }

  onChange(e){
    this.props.onChange(this.props.field, e.target.value);
  }

  render() {
    var css = 'input-field col ';
    css += this.props.css || '';

    return (
      <div className={css}>

        <input id={this.props.field} ref="date" type="date" className="datepicker"
          onChange={e => { this.onChange(e); }} />

        <label htmlFor={this.props.field}>{this.props.name}</label>

      </div>
    );

  }

};

DateInput.displayName = 'DateInput';