
import { TextField, IconButton, FontIcon, RaisedButton } from "material-ui";

export default class Manual extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var css = Theme.css;
    var iconcss = Theme.merge("raisedButtonLink", "right");
    var pwd = { width: "210px" };

    return (
      <form action={this.props.uri} method="post">
        <h3>{__.account_title_manual}</h3>

        { this.props.errors ?
          this.props.errors.map( err => {
            return (
              <p>{err}</p>
            );
          })
          : null }

        <TextField name="identifier" floatingLabelText={__.account_identifier} />
        <TextField name="password" type="password" floatingLabelText={__.account_password} style={pwd} />
        <IconButton iconClassName="material-icons" tooltipPosition="top-center"
          tooltip={__.account_recover_info} onClick={ e => {this.props.onRecover(e); }}>refresh</IconButton>

        <div style={css.buttonsSection}>
          <RaisedButton label={__.account_signin} secondary={true} linkButton={true}
            onClick={ e => {this.props.onRegister(e); } } style={css.left}>
          </RaisedButton>

          <RaisedButton primary={true} type="submit" label={__.account_login} style={css.right}>
            <FontIcon className="material-icons" style={iconcss}>send</FontIcon>
          </RaisedButton>
        </div>

      </form>
    );
  }

}
