
import Router, {RouteHandler, Route} from 'react-router';

import Home from './components/Home.jsx';
import Login from './components/Login.jsx';

export default class App extends React.Component {

  render() {
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">

          <div className="cover-container">

            <div className="inner cover">
              <RouteHandler />
            </div>

          </div>

        </div>

      </div>
    );
  }

};

var routes = (
  <Route handler={App} path="/">
    <Route name="home" path="/" handler={Home} />
    <Route name="login" path="/login" handler={Login} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});

