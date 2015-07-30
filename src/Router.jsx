
import Router, {Route, NotFoundRoute, DefaultRoute} from 'react-router';

import App from './App.jsx';
import Login from './components/account/Login.jsx';
import Home from './components/Home.jsx';

import Groups from './components/group/Index.jsx';
import GroupCreate from './components/group/Create.jsx';
import GroupEdit from './components/group/Edit.jsx';
import GroupView from './components/group/View.jsx';

import MeetingCreate from './components/meeting/Create.jsx';
import MeetingEdit from './components/meeting/Edit.jsx';
import MeetingView from './components/meeting/View.jsx';

import NotFound from './components/NotFound.jsx';


var HomeHandler = Home;
if (window.user){
  HomeHandler = Groups;
}

var routes = (
  <Route name="root" handler={App} path="/">
    <Route name="home" path="/" handler={HomeHandler} />

    <Route name="groups" path="/" handler={HomeHandler} />
    <Route name="groupnew" path="/groups/new" handler={GroupCreate} />
    <Route name="groupedit" path="/groups/:groupId/edit" handler={GroupEdit} />
    <Route name="group" path="/groups/:groupId" handler={GroupView} />

    <Route name="meetingnew" path="/meetings/:groupId/new" handler={MeetingCreate} />
    <Route name="meeting" path="/meetings/:meetingId" handler={MeetingView} />
    <Route name="meetingedit" path="/meetings/:meetingId/edit" handler={MeetingEdit} />

    <Route name="profile" path="/profile" handler={Login} />
    <Route name="login" path="/login" handler={Login} />
    <Route name="register" path="/register" handler={Login} />
    <Route name="recover" path="/recover" handler={Login} />

    <Route name="notfound" path="/notfound" handler={NotFound} />
    <NotFoundRoute handler={NotFound} />

    <DefaultRoute handler={HomeHandler}/>
  </Route>
);

window.app.router = Router
/*
  .create({
    routes: routes,
    scrollBehavior: Router.ScrollToTopBehavior
  })
*/
  .run(routes, Router.HistoryLocation, function (Handler) {
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