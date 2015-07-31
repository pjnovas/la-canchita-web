
import { TextField, FontIcon, RaisedButton, FlatButton } from "material-ui";

export default class Register extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var css = Theme.css;
    var iconcss = Theme.merge("raisedButtonLink", "right");

    return (
      <form action={this.props.uri} method="post">
        <h3>{__.account_signin_title}</h3>

        { this.props.errors ?
          this.props.errors.map( err => {
            return (
              <p>{err}</p>
            );
          })
          : null }

        <TextField name="identifier" floatingLabelText={__.account_user} />
        <TextField name="email" type="email" floatingLabelText={__.account_email}/>
        <TextField name="password" type="password" floatingLabelText={__.account_password} />

        <div style={css.buttonsSection}>
          <FlatButton label={__.back} default={true} linkButton={true}
            onClick={ e => {this.props.onBack(e); } } style={css.left}>
          </FlatButton>

          <RaisedButton primary={true} type="submit" label={__.account_signin_action} style={css.right}>
            <FontIcon className="material-icons" style={iconcss}>send</FontIcon>
          </RaisedButton>
        </div>

      </form>
    );
  }

}
