
var Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  Route = Router.Route;

import Header from './components/Header.jsx';
import Home from './components/Home.jsx';

var routes = (
  <Route handler={Header} path="/">
    <Route name="home" path="home/:someparam" handler={Home} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});

