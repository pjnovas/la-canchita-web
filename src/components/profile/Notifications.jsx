
import _ from "lodash";

import { UserActions } from "../../actions";

import { Input, Button, Grid, Row, Col } from "react-bootstrap";
import { Icon, Divider, Paper } from "../controls";

export default class ProfileNotifications extends React.Component {

  constructor(props) {
    super(props);
    this.state = _.cloneDeep(ProfileNotifications.defaultState);

    this.settings = [
      "emails",
      "invites",
      "meetings_create",
      "meetings_confirm_start",
      "meetings_cancel",
      "meetings_daybefore_start"
    ];
  }

  onChange(setting, value){
    this.props.onChange(setting, value);
    this.setState({isDirty: true});
  }

  onSave() {
    let model = this.props.model;
    let settings = model && model.settings || {};

    UserActions.updateMe({ settings });
    this.setState({isDirty: false});
  }

  getSettingCheck(prop){
    let model = this.props.model;
    let settings = model && model.settings || {};

    return (
      <Row>
        <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
          <Input type="checkbox" label={__["profile_setting_" + prop]}
            checked={settings[prop]}
            onChange={ (e) => { this.onChange(prop, e.target.checked); } }/>
        </Col>
      </Row>
    );
  }

  render() {

    return (
      <Grid className="profile-settings">
        <Paper skipHeader>
          <form>

            {this.settings.map(setting => {
              return this.getSettingCheck(setting);
            })}

            <Divider />

            <Row>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>

                {this.state.isDirty ?
                <Button bsStyle="success" onClick={ () => this.onSave() } className="pull-right">
                  {__.save}
                </Button>
                : null }

              </Col>
            </Row>

          </form>
        </Paper>
      </Grid>
    );
  }
}

ProfileNotifications.displayName = "ProfileNotifications";
ProfileNotifications.defaultState = {
  isDirty: false
};
