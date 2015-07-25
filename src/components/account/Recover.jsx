
export default class Manual extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <form className="row" action={this.props.uri} method="post">
        <h3 className="active">recuperar contraseña</h3>

        { this.props.errors ?
          this.props.errors.map( err => {
            return (
              <p>{err}</p>
            );
          })
          : null }

        <div className="input-field col s12">
          <input id="email" type="text" name="email" required  className="validate"/>
          <label htmlFor="email">email</label>
        </div>

        <div className="col s12">
          <button className="btn btn-large waves-effect waves-light right" type="submit">Enviar
            <i className="material-icons right">send</i>
          </button>
          <a className="waves-effect waves-blue btn-flat blue-text left "
            onClick={ e => {this.props.onBack(e); } }>volver</a>
        </div>

      </form>
    );
  }

}
