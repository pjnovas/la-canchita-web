import plugins from "./plugins";

import Theme from "./Theme";
window.Theme = Theme;

import Locales from "./locales";
var locales = new Locales("es-AR");
window.__ = locales.strings;

window.app = {};
import "./Router.jsx";
import App from "./App.jsx";
