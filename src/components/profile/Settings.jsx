
import _ from "lodash";

import { UserActions } from "../../actions";

import { Input, Button, Grid, Row, Col,  DropdownButton, MenuItem } from "react-bootstrap";
import { Icon, Divider, Paper } from "../controls";

export default class ProfileSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = _.cloneDeep(ProfileSettings.defaultState);

    this.prorities = ["goalkeeper", "defender", "midfielder", "forward", "any"];
    this.legs = ['left', 'right', 'both'];
  }

  getPriority(idx){
    let model = this.props.model;
    let ps = [
      model.priority || "any",
      model.priority2 || "any",
      model.priority3 || "any"
    ];

    return (
      <DropdownButton title={__["priority_" + ps[idx]]}>
        { this.prorities.map( priority => {
            return (
              <MenuItem key={priority} value={priority}
                onClick={ () => { this.onChangePriority(idx, priority); }}>
              {__["priority_" + priority]}
              </MenuItem>
            );
          })
        }
      </DropdownButton>
    );
  }

  onChangePriority(index, priority){
    let idx = index ? index+1 : "";
    this.props.onChange("priority"+idx, priority);

    this.setState({isDirty: true});
  }

  onChangeLeg(leg){
    this.props.onChange("leg", leg);
    this.setState({isDirty: true});
  }

  onSave() {
    let model = this.props.model;

    UserActions.updateMe({
      priority: model.priority,
      priority2: model.priority2,
      priority3: model.priority3,
      leg: model.leg,
    });

    this.setState({isDirty: false});
  }

  render() {

    return (
      <Grid className="profile-settings">
        <Paper skipHeader>
          <form>

            <Row>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                <p className="priorities-message">{__.profile_settings_priorities}</p>
              </Col>
            </Row>

            <Row>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                <label className="control-label">1.</label>
                {this.getPriority(0)}
              </Col>
            </Row>

            <Row>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                <label className="control-label">2.</label>
                {this.getPriority(1)}
              </Col>
            </Row>

            <Row>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                <label className="control-label">3.</label>
                {this.getPriority(2)}
              </Col>
            </Row>

            <Divider/>

            <Row>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                <p className="leg-message">{__.profile_settings_leg}</p>

                <DropdownButton title={__["legs_" + (this.props.model.leg || "both")]}>
                  { this.legs.map( leg => {
                      return (
                        <MenuItem key={leg} value={leg}
                          onClick={ () => { this.onChangeLeg(leg); }}>
                        {__["legs_" + leg]}
                        </MenuItem>
                      );
                    })
                  }
                </DropdownButton>

              </Col>
            </Row>

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

ProfileSettings.displayName = "ProfileSettings";
ProfileSettings.defaultState = {
  isDirty: false
};
