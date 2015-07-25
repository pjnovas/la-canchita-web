
import { Manual, Recover, Register } from './forms';

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      initial: true,
      social: true,
      manual: false,
      recover: false,
      register: false
    };

    if (window.redirect){
      this.state.redirect = window.redirect;
    }
  }

  onClickSocial(){
    this.setState({ initial: false, social: true, manual: false, register: false, recover: false });
  }

  onClickManual(){
    this.setState({ initial: false, social: false, manual: true, register: false, recover: false });
  }

  onClickRegister(){
    this.setState({ social: false, manual: false, register: true, recover: false });
  }

  onClickRecover(){
    this.setState({ social: false, manual: false, register: false, recover: true });
  }

  render() {

    var uris = {
      manual: '/auth/local',
      register: '/auth/local/register',
      recover: '/auth/local/recover',

      twitter: '/auth/twitter',
      facebook: '/auth/facebook',
      google: '/auth/google'
    };

    if (this.state.redirect){
      for (var p in uris){
        uris[p] += '?redirect=' + this.state.redirect;
      }
    }

    return (
      <div className="login">
        <div className="container">
          <div className="row">

            <div className="white col center s12 m6 z-depth-2 holder">
              <h1>app-name</h1>

              <div className="divider"></div>

              { this.state.social ?

              <div className="row">
                <h3 className="active">ingresar con tu red social</h3>

                <a className="col s6 social-button" href={uris.twitter} role="button">
                  <div className="twitter waves-effect waves-light">
                    Twitter
                  </div>
                </a>

                <a className="col s6 social-button" href={uris.facebook} role="button">
                  <div className="facebook waves-effect waves-light">
                    Facebook
                  </div>
                </a>

              </div>
              :
              <div className="row no-margin">
                <h3>ingresar con
                  <a onClick={ e => { this.onClickSocial(e); }}
                  className="waves-effect waves-blue blue-text btn-flat">tu red social</a>
                </h3>
              </div>
              }

              <div className="divider"></div>

              { this.state.social ?
                <h3>o con registro
                  <a onClick={ e => { this.onClickManual(e); }}
                  className="waves-effect waves-blue blue-text btn-flat">manual</a>
                </h3>
                : null }

              { this.state.manual ?
                <Manual uri={uris.manual}
                  onBack={ e => {this.onClickManual(e); } } /> : null }

              { this.state.register ?
                <Register uri={uris.register}
                  onBack={ e => {this.onClickManual(e); } } /> : null }

              { this.state.recover ?
                <Recover uri={uris.recover}
                  onBack={ e => {this.onClickManual(e); } } /> : null }

              { this.state.manual ?
              <div className="row no-margin">
                <div className="col s12">
                  <a className="btn waves-effect waves-blue blue left signup"
                    onClick={ e => {this.onClickRegister(e); } }>registro</a>
                  <a className="waves-effect waves-blue btn-flat right blue-text forgot"
                    onClick={ e => {this.onClickRecover(e); } }>recuperar contraseña</a>
                </div>
              </div>
              : null }

            </div>
          </div>
        </div>
      </div>
    );
  }

}
