
import {GroupActions} from "../../actions";

import GroupItem from "./Item.jsx";

import { Grid, Row, Col } from "react-bootstrap";
import { ActionButton } from "../controls";

export default class GroupList extends React.Component {

  constructor(props) {
    super(props);
    this.state = GroupList.defaultState;
  }

  render() {

    var groups = this.props.groups.filter( g => {
      if (g.member){
        return (["active", "pending"].indexOf(g.member.state) > -1);
      }
      else false;
    });

    var list = () => {

      if (groups.length){
        return (
          groups.map(model => {
            return <GroupItem key={model.id} model={model} />;
          })
        );
      }

      return (
        <div>
          <p>{__.group_start_1}</p>
          <p>{__.group_start_2}</p>
          <p>{__.group_start_3}</p>
        </div>
      );
    }();

    return (
      <Grid className="groups">

        <Row>
          <Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3}>
            {list}
          </Col>
        </Row>

        <ActionButton bsStyle="primary" icon="plus" to="groupnew" />
      </Grid>
    );
  }

};

GroupList.displayName = "GroupList";
GroupList.defaultState = {

};
