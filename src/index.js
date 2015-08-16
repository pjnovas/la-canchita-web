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

import notifier from "./Notifier";
window.notifier = notifier;

notifier.connect();
