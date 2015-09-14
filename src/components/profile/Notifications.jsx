
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
      "groups_change",
      "groups_members",
      "meetings_create",
      "meetings_change",
      "meetings_states",
      "meetings_remove",
    ]
  }

  onChange(setting, value){
    this.props.onChange(setting, value);
  }

  onSave() {
    let model = this.props.model;
    let settings = model && model.settings || {};

    UserActions.updateMe({ settings });
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

                <Button bsStyle="success" onClick={ () => this.onSave() } className="pull-right">
                  {__.save}
                </Button>

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

};
