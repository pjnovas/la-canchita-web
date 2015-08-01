
import moment from "moment";

import GroupActions from "../../actions/Group";
import MemberActions from "../../actions/Member";

import {Link} from "react-router";
import { Card, CardHeader, CardTitle, CardMedia, CardText, CardActions, FlatButton, FontIcon, Avatar } from "material-ui";

export default class GroupItem extends React.Component {

  onAcceptClick() {
    var gid = this.props.model.id;
    MemberActions.accept(this.props.model.id);
    GroupActions.accepted(gid);
  }

  onDeclineClick() {
    var gid = this.props.model.id;
    MemberActions.decline(gid);
    GroupActions.declined(gid);
  }

  render() {
    var model = this.props.model;
    var isInvite = model.member.state === "pending";

    var subtitle = "";
    if (isInvite){
      var m = model.member;

      subtitle = __.group_card_invitation_by
        .replace("{1}", m.invitedBy.user.name)
        .replace("{2}", moment(m.updatedAt || m.createdAt).fromNow());
    }

    var media = {
      maxHeight: "200px",
      overflow: "hidden"
    };

    return (
      <Card style={ {margin: "20px 0"} }>

        { isInvite ?
        <CardHeader
          title={__.group_card_invitation}
          subtitle={subtitle}
          avatar={
            <Avatar icon={<FontIcon className="material-icons">arrow_forward</FontIcon>} />
          }
        />
        : null }

        <CardMedia overlay={<CardTitle title={model.title}/>} style={media}>
          <img src={ "/images/groups/" + model.picture }/>
        </CardMedia>

        <CardText>{model.description}</CardText>

        <CardActions>
         { isInvite ?
          <div>
            <FlatButton label={__.group_card_decline}
              onClick={ e => { this.onDeclineClick(e); } }/>

            <FlatButton label={__.group_card_accept}
              onClick={ e => { this.onAcceptClick(e); } }/>
          </div>
          :
            <FlatButton linkButton={true} label={__.group_card_open}
              containerElement={<Link to="group" params={{groupId: model.id}} />} />
          }
        </CardActions>
      </Card>
    );
  }

};

GroupItem.displayName = "GroupItem";
