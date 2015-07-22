
import { ButtonFlat } from '../controls';
import DropPicture from './DropPicture.jsx';

export default class GroupForm extends React.Component {

  constructor(props) {
    super(props);
  }

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

    var buttons = () => {

      if (this.props.loading){
        return (
          <div className="col s12">

            <a className="waves-effect waves-light btn-large disabled right">
              <div className="la-ball-atom la-2x left">
                <div></div><div></div><div></div><div></div>
              </div>
              guardando
            </a>

          </div>
        );
      }

      return (
        <div className="col s12">

          <ButtonFlat css="left" text="cancelar"
            onClick={ e => { this.props.onCancel(e); } } />

          <a className="waves-effect waves-light btn-large right"
            onClick={ e => { this.save(e); } }>
            <i className="material-icons right">check</i>Guardar
          </a>

        </div>
      );
    }();

    return (

      <form className="white col center s12 m8 offset-m2 l6 offset-l3 z-depth-1">

        <DropPicture picture={this.props.picture}
          onChangePicture={ pic => { this.changePicture(pic); }} />

        <div className="row">
          <div className="input-field col s12">

            <input id="title" type="text" className="validate"
              placeholder="Los pibes de la esquina"
              onChange={e => { this.changeTitle(e); }}
              value={this.props.title} />

            <label htmlFor="title">Título</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">

            <textarea id="description" className="materialize-textarea"
              placeholder="Para el fulbito de los sábados. Si llueve se suspende!"
              onChange={e => { this.changeDescription(e); }}
              value={this.props.description} />

            <label htmlFor="description">Descripción</label>
          </div>
        </div>

        <div className="row">
          {buttons}
        </div>

      </form>
    );
  }

};

GroupForm.displayName = 'GroupForm';
