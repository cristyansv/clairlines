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

var Routes = (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
            <Bar />
            <Router history={hashHistory}>
                <Route path="/" component={Index}/>
                <Route path="/empleados" component={Empleados}/>
            </Router>
        </div>
    </MuiThemeProvider>
);


var Routes = (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
            <Bar />
            <Router history={hashHistory}>
                <Route path="/" component={Index}/>
                <Route path="/pasajeros" component={Pasajeros}/>
            </Router>
        </div>
    </MuiThemeProvider>
);

var Routes = (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
            <Bar />
            <Router history={hashHistory}>
                <Route path="/" component={Index}/>
                <Route path="/aeropuertos" component={Aeropuertos}/>
            </Router>
        </div>
    </MuiThemeProvider>
);

export default Routes;