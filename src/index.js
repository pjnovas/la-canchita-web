import plugins from "./plugins";

import Locales from "./locales";
var locales = new Locales("es-AR");
window.__ = locales.strings;

window.app = {};
import "./Router.jsx";
import App from "./App.jsx";
