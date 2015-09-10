
import { GroupActions } from "../../actions";

import { Button, Grid, Row, Col } from "react-bootstrap";
import { ActionButton, Confirm } from "../controls";

export default class GroupDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = GroupDetail.defaultState;

    this.editors = ["owner", "admin"];
    this.destroyers = ["owner"];
  }

  onDestroyClick(){
    this.setState({ confirmDelete: true });
  }

  destroyGroup() {
    GroupActions.destroy(this.props.model.id);
  }

  render() {
    let model = this.props.model;

    if (!model.id) {
      return null;
    }

    let myRole = model.member && model.member.role || "member";
    let canEdit = this.editors.indexOf(myRole) > -1;
    let canRemove = this.destroyers.indexOf(myRole) > -1;

    let gName = model.title || __.group;

    let media;
    if (model.picture){
      media = {
        backgroundImage: "url(/images/groups/" + model.picture + ")"
      };
    }

    return (
      <Grid className="group-detail">

        { media ?
          <Row>
            <Col xs={12} className="media" style={media}></Col>
          </Row>
        : null }

        <Row>
          <Col xs={12} className="title">
            <h1>{gName}</h1>
          </Col>
        </Row>

        { model.description ?
          <Row>
            <Col xs={12} className="description">
              {model.description}
            </Col>
          </Row>
        : null }

        { canRemove ?
          <Button bsStyle="danger"
            onClick={ () => { this.onDestroyClick(); } }>
            {__.remove}
          </Button>
        : null }

        { canEdit ?
          <ActionButton bsStyle="primary" icon="pencil"
            to="groupedit" params={{groupId: model.id}}/>
        : null }

        { this.state.confirmDelete ?
          <Confirm title={__.group_destroy_title.replace("{1}", gName)}
            text={__.group_destroy_text.replace("{1}", gName)}
            onClose={ () => this.setState({ confirmDelete: false }) }
            onAccept={ () => this.destroyGroup() } />
        : null }

      </Grid>
    );
  }

};

GroupDetail.displayName = "GroupDetail";
GroupDetail.defaultState = {
  confirmDelete: false
};
