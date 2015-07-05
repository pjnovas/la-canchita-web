
import {ButtonLink} from 'react-router-bootstrap';

export default class Home extends React.Component {

  render() {
    return (
      <div className="not-found">
        <p className="lead">Not Found!</p>
        <ButtonLink to="home" className="btn-lg">Ir a Inicio</ButtonLink>
      </div>
    );
  }

};

