
import { Paper, ClearFix, FlatButton, RaisedButton } from 'material-ui';
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

    switch (window.location.pathname){
      case '/register':
        this.state.initial = false;
        this.state.social = false;
        this.state.register = true;
      break;
      case '/recover':
        this.state.initial = false;
        this.state.social = false;
        this.state.recover = true;
      break;
    }

    if (window.errors && window.errors.length){
      this.state.errors = window.errors;

      if (window.location.pathname === '/login'){
        this.state.initial = false;
        this.state.social = false;
        this.state.manual = true;
      }
    }
  }

  onClickSocial(){
    this.setState({ initial: false, social: true, manual: false, register: false, recover: false, errors: [] });
  }

  onClickManual(){
    this.setState({ initial: false, social: false, manual: true, register: false, recover: false, errors: [] });
  }

  onClickRegister(){
    this.setState({ social: false, manual: false, register: true, recover: false, errors: [] });
  }

  onClickRecover(){
    this.setState({ social: false, manual: false, register: false, recover: true, errors: [] });
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

    let main = {
      'width': '100%',
      'max-width': '500px',
      'margin': '0 auto',
      'text-align': 'center',
      'padding': '20px',
      'margin-top': '20px'
    };

    let tw = {
      color: '#000',
      'background-color': 'blue'
    };

    let fb = {
      color: '#000',
      'background-color': 'blue'
    };

    let gl = {
      color: '#000',
      'background-color': 'blue'
    };


    return (
      <Paper zDepth={1} rounded={true} style={main}>
        <h1>app-name</h1>
        <div className="divider"></div>

        { this.state.social ?

        <ClearFix>

          <h3 className="active">ingresar con tu red social</h3>

          <FlatButton linkButton={true} href={uris.twitter}
            secondary={true} label="Twitter">
          </FlatButton>

          <FlatButton linkButton={true} href={uris.facebook}
            secondary={true} label="Facebook">
          </FlatButton>

          <FlatButton linkButton={true} href={uris.google}
            secondary={true} label="Google">
          </FlatButton>

        </ClearFix>
        :
        <div className="row no-margin">
          <h3>ingresar con
            <FlatButton linkButton={true} default={true} label="tu red social"
              onClick={ e => { this.onClickSocial(e); }} style={ {display: 'inline-table'} } >
            </FlatButton>
          </h3>
        </div>
        }

        <div className="divider"></div>

        { this.state.social ?
          <h3>o con registro
            <FlatButton linkButton={true} default={true} label="manual"
              onClick={ e => { this.onClickManual(e); }} style={ {display: 'inline-table'} } >
            </FlatButton>
          </h3>
          : null }

        { this.state.manual ?
          <Manual uri={uris.manual} errors={this.state.errors}
            onBack={ e => {this.onClickManual(e); } } /> : null }

        { this.state.register ?
          <Register uri={uris.register} errors={this.state.errors}
            onBack={ e => {this.onClickManual(e); } } /> : null }

        { this.state.recover ?
          <Recover uri={uris.recover} errors={this.state.errors}
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

      </Paper>
    );
  }

}
