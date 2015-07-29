
export default class TextInput extends React.Component {

  onChange(e){
    this.props.onChange(this.props.field, e.target.value);
  }

  render() {
    var css = 'input-field col ';
    css += this.props.css || '';

    return (
      <div className={css}>

        <input id={this.props.field} type="text"
          placeholder={this.props.placeholder}
          onChange={e => { this.onChange(e); }}
          value={this.props.value} />

        <label htmlFor={this.props.field}>{this.props.name}</label>

      </div>
    );

  }

};

TextInput.displayName = 'TextInput';