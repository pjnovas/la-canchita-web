import plugins from "./plugins";

import "moment/locale/es"; //use spanish
//moment.locale("es"); // not necesary for now

import Locales from "./locales";
var locales = new Locales("es-AR");
window.__ = locales.strings;

import "eonasdan-bootstrap-datetimepicker";

window.app = {};
import "./Router.jsx";
import App from "./App.jsx";
