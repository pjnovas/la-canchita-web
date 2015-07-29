
export default class Switch extends React.Component {

  onChange(e){
    this.props.onChange(this.props.field, e.target.value);
  }

  render() {
    var css = 'switch ';
    css += this.props.css || '';

    return (
      <div className={css}>
        <label>{this.props.name}</label>
        <br/>
        <label>
          No
          <input type="checkbox" onChange={e => { this.onChange(e); }} />
          <span className="lever"></span>
          Si
        </label>

      </div>
    );

  }

};

Switch.displayName = 'Switch';
