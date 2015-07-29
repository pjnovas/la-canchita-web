
import { Button, ButtonFlat, TextInput, TextArea, DateInput, Switch } from '../controls';

export default class MeetingForm extends React.Component {

  constructor(props) {
    super(props);
  }

  changeField(prop, value){
    this.props.onChange({ [prop]: value });
  }

  save(){
    this.props.onSave();
  }

  render() {

    return (

      <form className="white col center s12 m8 offset-m2 l6 offset-l3 z-depth-1">

        <div className="row">

          <TextInput css="s12" field="title" value={this.props.title} name="Título"
            placeholder="Partido de los Lunes en LaCanchita"
            onChange={ (field, value) => { this.changeField(field, value); }} />

          <TextArea css="s12" field="info" value={this.props.info} name="Información"
            placeholder="Nos encontramos 15 minutos antes, tiene estacionamiento. Si llueve se suspende!"
            onChange={ (field, value) => { this.changeField(field, value); }} />

          <TextInput css="s12" field="place" value={this.props.place} name="Lugar"
            placeholder="Juan B. Justo 1234, Ciudad Autónoma de Buenos Aires"
            onChange={ (field, value) => { this.changeField(field, value); }} />

          <DateInput css="s12" field="when" value={this.props.when} name="Cuando"
            onChange={ (field, value) => { this.changeField(field, value); }} />

          <div className="col s12">
            <label className="field-title left">Reemplazos</label>
          </div>

          <div className="col s12 margin-bottom">
            <Switch field="replacements" value={this.props.replacements} css="left"
              onChange={ (field, value) => { this.changeField(field, value); }} />
          </div>

          <div className="col s12">
            <label className="field-title left">Confirmaciones</label>
          </div>

          <div className="col s12">

            <div className="col s4">
              <Switch field="confirmation" value={this.props.confirmation} css="left"
                onChange={ (field, value) => { this.changeField(field, value); }} />
            </div>

            <DateInput css="s4" field="confirmStart" value={this.props.confirmStart} name="Incio"
              onChange={ (field, value) => { this.changeField(field, value); }} />

            <DateInput css="s4" field="confirmEnd" value={this.props.confirmEnd} name="Fin"
              onChange={ (field, value) => { this.changeField(field, value); }} />

          </div>

          <div className="col s12">
            <label className="field-title left">Límite de participantes</label>
          </div>

          <div className="col s12">

            <TextInput css="s6" field="min" value={this.props.min} name="Mínimo (0 sin límite)"
              onChange={ (field, value) => { this.changeField(field, value); }} />

            <TextInput css="s6" field="max" value={this.props.max} name="Máximo (0 sin límite)"
              onChange={ (field, value) => { this.changeField(field, value); }} />

          </div>


          <div className="col s12">
            <ButtonFlat css="left" text="cancelar" hidden={this.props.loading}
              onClick={ e => { this.props.onCancel(e); } } />

            <Button
              text="Guardar" css="right" icon="check"
              loadingText="Guardando" loading={this.props.loading}
              onClick={ e => { this.save(e); } } />
          </div>

        </div>

      </form>
    );
  }

};

MeetingForm.displayName = 'MeetingForm';
