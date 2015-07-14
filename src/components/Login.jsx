
export default class App extends React.Component {

  render() {
    return (
      <div className="teal login">
        <div className="container">
          <div className="row">

            <form className="white col center s12 m6 z-depth-2" action="/auth/local" method="post">

              <h1>app-name</h1>

              <div className="divider"></div>

              <div className="row">
                <h3>ingresar de una usando</h3>
              </div>

              <div className="row">

                <a className="col s6 social-button" href="/auth/twitter" role="button">
                  <div className="twitter waves-effect waves-light">
                    Twitter
                  </div>
                </a>

                <a className="col s6 social-button" href="/auth/facebook" role="button">
                  <div className="facebook waves-effect waves-light">
                    Facebook
                  </div>
                </a>

              </div>

              <div className="divider"></div>

              <h3>o con registro <a id="toggle-manual" className="waves-effect waves-teal btn-flat">manual</a></h3>

                <div id="manual" className="hide">
                  <div className="input-field col s12">
                    <input id="identifier" type="text" name="identifier" required  className="validate"/>
                    <label htmlFor="identifier">Usuario o email</label>
                  </div>

                  <div className="input-field col s12">
                    <input id="password" type="password" name="password" className="validate" required/>
                    <label htmlFor="password">Contraseña</label>
                  </div>

                  <a className="forgot">me olvidé la contraseña</a>
                  <input type="submit" value="Ingresar" className="btn btn-lg btn-primary btn-block"/>

                  <a className="signup">registrarse</a>
                </div>
            </form>

          </div>
        </div>
      </div>
    );
  }

}
