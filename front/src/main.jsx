import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes.jsx'

import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();

ReactDOM.render(Routes, document.getElementById('App'));