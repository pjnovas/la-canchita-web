
import Header from "./Header.jsx";

import { Link } from "react-router";
import { IconButton } from "material-ui";

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <h1>LANDING PAGE HERE</h1>

        <IconButton
          iconClassName="material-icons"
          containerElement={<Link to="login" />}
          tooltip="login"
          linkButton={true}>
          person
        </IconButton>
      </div>
    );
  }

};
