import 'babel-core/polyfill';

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
