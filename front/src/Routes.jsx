import React from 'react';
import { Router, Route, hashHistory } from 'react-router'
import Index from './components/Index.jsx';
import Aviones from './components/Aviones.jsx';


import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Bar from './components/Bar.jsx';


var Routes = (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
            <Bar />
            <Router history={hashHistory}>
                <Route path="/" component={Index}/>
                <Route path="/aviones" component={Aviones}/>
            </Router>
        </div>
    </MuiThemeProvider>
);

export default Routes;