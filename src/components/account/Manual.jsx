
import { TextField, IconButton, FontIcon, RaisedButton } from 'material-ui';

export default class Manual extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <form action={this.props.uri} method="post">
        <h3 className="active">ingreso manual</h3>

        { this.props.errors ?
          this.props.errors.map( err => {
            return (
              <p>{err}</p>
            );
          })
          : null }

        <TextField name="identifier" floatingLabelText="Usuario o email" />
        <TextField name="password" type="password" floatingLabelText="Contraseña" />

        <div>
          <RaisedButton type="submit" label="Ingresar">
            <FontIcon className="material-icons">send</FontIcon>
          </RaisedButton>
        </div>

      </form>
    );
  }

}

/*
         <IconButton
          iconClassName="material-icons"
          containerElement={<Link to="login" />}
          tooltip="login"
          linkButton={true}>
          person
        </IconButton>
*/

/*

        <div className="input-field col s12">
          <input id="identifier" type="text" name="identifier" required  className="validate"/>
          <label htmlFor="identifier">Usuario o email</label>
        </div>

        <div className="input-field col s12">
          <input id="password" type="password" name="password" className="validate" required/>
          <label htmlFor="password">Contraseña</label>
        </div>
*/