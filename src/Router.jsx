
import Router, {Route, NotFoundRoute, DefaultRoute} from "react-router";

import App from "./App.jsx";
import Login from "./components/account/Login.jsx";
import NewPassword from "./components/account/NewPassword.jsx";
import Home from "./components/Home.jsx";
import Profile from "./components/profile/index.jsx";

import Groups from "./components/group/index.jsx";
import GroupEdit from "./components/group/Edit.jsx";
import GroupView from "./components/group/View.jsx";

import MeetingEdit from "./components/meeting/Edit.jsx";
import MeetingView from "./components/meeting/View.jsx";

import NotFound from "./components/NotFound.jsx";

const routes = (
  <Route name="root" handler={App} path="/">
    <Route path="/" name="home" handler={Home} />

    <Route path="/groups" name="groups" handler={Groups} />
    <Route path="/groups/new" name="groupnew" handler={GroupEdit} />

    <Route path="/groups/:groupId" name="group" handler={GroupView} />
    <Route path="/groups/:groupId/edit" name="groupedit" handler={GroupEdit} />
    <Route path="/groups/:groupId/:tab" name="grouptab" handler={GroupView} />

    <Route path="/meetings/:groupId/new" name="meetingnew" handler={MeetingEdit} />
    <Route path="/meetings/:groupId/new/:cloneId" name="meetingclone" handler={MeetingEdit} />
    <Route path="/meetings/:meetingId/edit" name="meetingedit" handler={MeetingEdit} />
    <Route path="/meetings/:meetingId" name="meeting" handler={MeetingView} />

    <Route path="/profile" name="profile" handler={Profile} />
    <Route path="/login" name="login" handler={Login} />
    <Route path="/register" name="register" handler={Login} />
    <Route path="/recover" name="recover" handler={Login} />
    <Route path="/newpassword/:token" name="newpassword" handler={NewPassword} />

    <Route path="/notfound" name="notfound" handler={NotFound} />
    <NotFoundRoute handler={NotFound} />

    <DefaultRoute handler={Home}/>
  </Route>
);

window.app.router = Router
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
