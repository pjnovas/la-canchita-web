
import moment from "moment";

import GroupActions from "../../actions/Group";
import MemberActions from "../../actions/Member";

import { Button } from "react-bootstrap";
import { Card, Icon } from "../controls";

export default class GroupItem extends React.Component {

  onAcceptClick() {
    let gid = this.props.model.id;
    MemberActions.accept(this.props.model.id);
    GroupActions.accepted(gid);
  }

  onDeclineClick() {
    let gid = this.props.model.id;
    MemberActions.decline(gid);
    GroupActions.declined(gid);
  }

  render() {
    let model = this.props.model;

    let isInvite = model.member.state === "pending";
    //let isInvite = true; > for test invite cards

    let htitle = "";
    let subtitle = "";
    if (isInvite){
      let m = model.member;

      htitle = __.group_card_invitation;
      subtitle = __.group_card_invitation_by
        .replace("{1}", m.invitedBy && m.invitedBy.user && m.invitedBy.user.name || '')
        .replace("{2}", moment(m.updatedAt || m.createdAt).fromNow());
    }

    let actions = [
      (<Button bsStyle="link" to="group" params={{groupId: model.id}}>
        {__.group_card_open}
      </Button>)
    ];

    if (isInvite){

      actions = [

        (<Button bsStyle="link"
          onClick={ e => { this.onAcceptClick(e); } }>
          <Icon name="check" />{__.group_card_accept}
        </Button>),

        (<Button bsStyle="link"
          onClick={ e => { this.onDeclineClick(e); } }>
          <Icon name="times" />{__.group_card_decline}
        </Button>)

      ];
    }

    return (
      <Card
        htitle={htitle}
        hicon="ticket"
        hsubtitle={subtitle}
        title={model.title}
        description={model.description}
        media={ "/images/groups/" + model.picture }
        actions={(actions)}>
      </Card>
    );
  }

};

GroupItem.displayName = "GroupItem";
