
import Header from "./Header.jsx";

import { ButtonLink } from "react-router-bootstrap";
import { Icon } from "./controls";

export default class Home extends React.Component {

  render() {
    return (
      <div className="landing">
        <Header />

        <div className="landing-header">
          <div className="text-vcenter call-action">

            <h1>{__.app_title}</h1>
            <h2>{__.landing_legend}</h2>

          </div>
        </div>

      </div>
    );
  }

};
