
export default class Profile extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <form className="row" action="" method="post">
        <h3 className="active">Profile</h3>

        <div className="input-field col s12">
          <input id="identifier" type="text" name="identifier" required  className="validate"/>
          <label htmlFor="identifier">Usuario o email</label>
        </div>

        <div className="input-field col s12">
          <input id="password" type="password" name="password" className="validate" required/>
          <label htmlFor="password">Contraseña</label>
        </div>

        <div className="col s12">
          <button className="btn btn-large waves-effect waves-light right" type="submit">Ingresar
            <i className="material-icons right">send</i>
          </button>
        </div>

      </form>
    );
  }

}
