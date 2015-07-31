
import { TextField, FontIcon, RaisedButton, FlatButton } from 'material-ui';

export default class Register extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var css = Theme.css;
    var iconcss = Theme.merge('raisedButtonLink', 'right');

    return (
      <form action={this.props.uri} method="post">
        <h3>registro</h3>

        { this.props.errors ?
          this.props.errors.map( err => {
            return (
              <p>{err}</p>
            );
          })
          : null }

        <TextField name="identifier" floatingLabelText="Usuario" />
        <TextField name="email" type="email" floatingLabelText="Email"/>
        <TextField name="password" type="password" floatingLabelText="Contraseña" />

        <div style={css.buttonsSection}>
          <FlatButton label="VOLVER" default={true} linkButton={true}
            onClick={ e => {this.props.onBack(e); } } style={css.left}>
          </FlatButton>

          <RaisedButton primary={true} type="submit" label="Registrarse" style={css.right}>
            <FontIcon className="material-icons" style={iconcss}>send</FontIcon>
          </RaisedButton>
        </div>

      </form>
    );
  }

}

/*
 <div className="input-field col s12">
  <input id="username" type="text" name="username" required  className="validate"/>
  <label htmlFor="username">Usuario</label>
</div>

<div className="input-field col s12">
  <input id="email" type="text" name="email" required  className="validate"/>
  <label htmlFor="email">Email</label>
</div>

<div className="input-field col s12">
  <input id="password" type="password" name="password" className="validate" required/>
  <label htmlFor="password">Contraseña</label>
</div>

<div className="col s12">
  <button className="btn btn-large waves-effect waves-light right" type="submit">Registrarse
    <i className="material-icons right">send</i>
  </button>
  <a className="waves-effect waves-blue btn-flat blue-text left "
    onClick={ e => {this.props.onBack(e); } }>volver</a>
</div>
*/