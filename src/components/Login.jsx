
import {Icon} from 'react-font-awesome';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <form className="form-signin" role="form" action="/auth/local" method="post">
          <h1 className="form-signin-heading text-center">La Canchita</h1>

          <hr/>

          <h3>ingresar con</h3>

          <a className="twitter" href="/auth/twitter" role="button">
            <Icon type="twitter" />
          </a>

          <a className="facebook" href="/auth/facebook" role="button">
            <Icon type="facebook" />
          </a>

          <hr/>

          <h3>... o a manopla con</h3>

          <input type="text" name="identifier" placeholder="Usuario o email" className="form-control"/>
          <input type="password" name="password" placeholder="Contraseña" className="form-control"/>
          <a className="forgot">me olvidé la contraseña</a>
          <input type="submit" value="Ingresar" className="btn btn-lg btn-primary btn-block"/>

          <a className="signup">registrarse</a>

        </form>
      </div>
    );
  }

}
