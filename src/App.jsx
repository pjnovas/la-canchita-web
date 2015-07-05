
import Router, {RouteHandler, Route, NotFoundRoute} from 'react-router';

import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Groups from './components/group/Index.jsx';
import GroupEdit from './components/group/Create.jsx';
import GroupView from './components/group/View.jsx';
import NotFound from './components/NotFound.jsx';

import Header from './components/Header.jsx';

export default class App extends React.Component {

  render() {
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">

          <div className="cover-container">

            <Header />

            <div className="inner cover">
              <RouteHandler />
            </div>

          </div>

        </div>

      </div>
    );
  }

};

var HomeHandler = Home;
if (window.user){
  HomeHandler = Groups;
}

var routes = (
  <Route handler={App} path="/">
    <Route name="home" path="/" handler={HomeHandler} />
    <Route name="groups" path="/" handler={HomeHandler} />
    <Route name="newgroup" path="/groups/new" handler={GroupEdit} />
    <Route name="group" path="/groups/:groupId" handler={GroupView} />
    <Route name="login" path="/login" handler={Login} />

    <Route name="notfound" path="/notfound" handler={NotFound} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

window.app.router = Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});

window.app.handleError = function(code, err){
  if (!window.user){
    window.app.router.transitionTo('login');
    return;
  }

  switch (code){
    case 404:
      window.app.router.transitionTo('notfound');
      break;
    default:
      console.error('Unhandled Error');
      console.dir(err);
      break;
  }
};