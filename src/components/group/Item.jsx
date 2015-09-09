
import moment from "moment";

import {GroupActions} from "../../actions";

import { ButtonLink } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { Card, Icon } from "../controls";

export default class GroupItem extends React.Component {

  onAcceptClick() {
    GroupActions.accept(this.props.model.id);
  }

  onDeclineClick() {
    GroupActions.reject(this.props.model.id);
  }

  render() {
    let model = this.props.model;

    let isInvite = model.member.state === "pending";
    //let isInvite = true;  // > for test invite cards

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
      (<ButtonLink bsStyle="link" className="pull-right" to="group" params={{groupId: model.id}}>
        {__.group_card_open}
      </ButtonLink>)
    ];

    if (isInvite){

      actions = [

        (<Button bsStyle="link" className="btn-success"
          onClick={ e => { this.onAcceptClick(e); } }>
          <Icon name="check" />{__.group_card_accept}
        </Button>),

        (<Button bsStyle="link" className="btn-danger"
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
        media={ model.picture ? "/images/groups/" + model.picture : true }
        actions={(actions)}>
      </Card>
    );
  }

};

GroupItem.displayName = "GroupItem";
