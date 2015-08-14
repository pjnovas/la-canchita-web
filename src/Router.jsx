
import Router, {Route, NotFoundRoute, DefaultRoute} from "react-router";

import App from "./App.jsx";
import Login from "./components/account/Login.jsx";
import Home from "./components/Home.jsx";
import Profile from "./components/account/Profile.jsx";

import Groups from "./components/group/Index.jsx";
import GroupCreate from "./components/group/Create.jsx";
import GroupEdit from "./components/group/Edit.jsx";
import GroupView from "./components/group/View.jsx";

import MeetingCreate from "./components/meeting/Create.jsx";
import MeetingEdit from "./components/meeting/Edit.jsx";
import MeetingView from "./components/meeting/View.jsx";

import NotFound from "./components/NotFound.jsx";

var HomeHandler = Home;
if (window.user){
  HomeHandler = Groups;
}

var routes = (
  <Route name="root" handler={App} path="/">
    <Route path="/" name="home" handler={HomeHandler} />

    <Route path="/groups" name="groups" handler={HomeHandler} />
    <Route path="/groups/new" name="groupnew" handler={GroupCreate} />
    <Route path="/groups/:groupId" name="group" handler={GroupView} />
    <Route path="/groups/:groupId/edit" name="groupedit" handler={GroupEdit} />
    <Route path="/groups/:groupId/:tab" name="grouptab" handler={GroupView} />

    <Route path="/meetings/:groupId/new" name="meetingnew" handler={MeetingCreate} />
    <Route path="/meetings/:meetingId" name="meeting" handler={MeetingView} />
    <Route path="/meetings/:meetingId/edit" name="meetingedit" handler={MeetingEdit} />

    <Route path="/profile" name="profile" handler={Profile} />
    <Route path="/login" name="login" handler={Login} />
    <Route path="/register" name="register" handler={Login} />
    <Route path="/recover" name="recover" handler={Login} />

    <Route path="/notfound" name="notfound" handler={NotFound} />
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
    React.render(<Handler/>, document.getElementById("app"));
  });

window.app.handleError = function(code, err){
  if (!window.user){
    window.app.router.transitionTo("login");
    return;
  }

  switch (code){
    case 404:
      window.app.router.transitionTo("notfound");
      break;
    default:
      console.error("Unhandled Error");
      console.dir(err);
      break;
  }
};
