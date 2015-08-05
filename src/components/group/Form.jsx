
import DropPicture from "./DropPicture.jsx";

import { Input, Button, Row, Col } from "react-bootstrap";
import { Icon, Divider } from "../controls";

export default class GroupForm extends React.Component {

  changeTitle(e) {
    this.props.onChange({ title: e.target.value });
  }

  changeDescription(e) {
    this.props.onChange({ description: e.target.value });
  }

  changePicture(picture){
    this.props.onChange({ newpicture: picture });
  }

  save(){
    this.props.onSave();
  }

  render() {

    return (
      <form>

        <Row>
          <Col xs={12}>
            <h1>{this.props.formTitle}</h1>
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col xs={10} xsOffset={1} sm={6} smOffset={3}>

            <DropPicture picture={this.props.picture}
              onChangePicture={ pic => { this.changePicture(pic); }} />

          </Col>
        </Row>

        <Row>
          <Col xs={10} xsOffset={1} sm={6} smOffset={3}>

            <Input type="text" label={__.group_title}
              placeholder={__.group_title_hint}
              onChange={e => { this.changeTitle(e); }}
              value={this.props.title} />

          </Col>
        </Row>

        <Row>
          <Col xs={10} xsOffset={1} sm={6} smOffset={3}>

            <Input type="textarea" label={__.group_description} rows="4"
              placeholder={__.group_description_hint}
              onChange={e => { this.changeDescription(e); }}
              value={this.props.description} />

          </Col>
        </Row>

        <Divider />

        <Row>
          <Col xs={10} xsOffset={1} sm={6} smOffset={3}>

            <Button bsStyle="link" onClick={ e => {this.props.onCancel(e); } }>
              {__.cancel}
            </Button>

            <Button bsStyle="success" onClick={ e => { this.save(e); } } className="pull-right">
              {__.save}
            </Button>

          </Col>
        </Row>

      </form>
    );
  }

};

GroupForm.displayName = "GroupForm";
