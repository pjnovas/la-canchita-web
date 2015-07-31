
import { TextField, FontIcon, RaisedButton, FlatButton } from 'material-ui';

export default class Recover extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var css = Theme.css;
    var iconcss = Theme.merge('raisedButtonLink', 'right');

    return (
      <form action={this.props.uri} method="post">
        <h3>recuperar contraseña</h3>

        { this.props.errors ?
          this.props.errors.map( err => {
            return (
              <p>{err}</p>
            );
          })
          : null }

        <TextField name="email" type="email" floatingLabelText="Email"/>

        <div style={css.buttonsSection}>
          <FlatButton label="VOLVER" default={true} linkButton={true}
            onClick={ e => {this.props.onBack(e); } } style={css.left}>
          </FlatButton>

          <RaisedButton primary={true} type="submit" label="Enviar" style={css.right}>
            <FontIcon className="material-icons" style={iconcss}>mail</FontIcon>
          </RaisedButton>
        </div>

      </form>
    );
  }

}
