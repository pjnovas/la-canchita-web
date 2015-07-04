
import Router, {RouteHandler, Route} from 'react-router';

import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Groups from './components/Groups.jsx';
import GroupEdit from './components/GroupEdit.jsx';

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

var HomeHandler = Home;
if (window.user){
  HomeHandler = Groups;
}

var routes = (
  <Route handler={App} path="/">
    <Route name="home" path="/" handler={HomeHandler} />
    <Route name="groups" path="/" handler={HomeHandler} />
    <Route name="login" path="/login" handler={Login} />
    <Route name="newgroup" path="/groups/new" handler={GroupEdit} />
  </Route>
);

window.AppRouter = Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});

