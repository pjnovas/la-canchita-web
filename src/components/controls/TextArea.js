
export default class TextArea extends React.Component {

  onChange(e){
    this.props.onChange(this.props.field, e.target.value);
  }

  render() {
    var css = 'input-field col ';
    css += this.props.css || '';

    return (
      <div className={css}>

        <textarea id={this.props.field} className="materialize-textarea"
          placeholder={this.props.placeholder}
          onChange={e => { this.onChange(e); }}
          value={this.props.value} />

        <label htmlFor={this.props.field}>{this.props.name}</label>

      </div>
    );

  }

};

TextArea.displayName = 'TextArea';