import "babel/register";

import React from "react";

import $ from "jquery";
window.$ = window.jQuery = $;

import "bootstrap";

//Needed for React Developer Tools
window.React = React;
window.google = window.google || {};
