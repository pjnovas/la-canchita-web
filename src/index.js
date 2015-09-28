import plugins from "./plugins";

import "moment/locale/es"; //use spanish
import moment from "moment";
moment.locale("es");
window.moment = moment;

import Locales from "./locales";
var locales = new Locales("es-AR");
window.__ = locales.strings;

import "eonasdan-bootstrap-datetimepicker";

window.app = {};
import "./Router.jsx";
import App from "./App.jsx";

// Remove autoconnection of sails websockets
io.sails.autoConnect = false;

// Removed this join cause it was overriding the group item room
// Was moved into /components/group/index.js

//import {Notifications} from "./api";
//if (window.user){
//  Notifications.join("", { uid: window.user.id });
//}
