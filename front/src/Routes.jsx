import React from 'react';
import { Router, Route, hashHistory } from 'react-router'
import Index from './components/Index.jsx';
import Aviones from './components/Aviones.jsx';
import Empleados from './components/Empleados.jsx';
import Pasajeros from './components/Pasajeros.jsx';
import Aeropuertos from './components/Aeropuertos.jsx';


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
                <Route path="/empleados" component={Empleados}/>
                <Route path="/pasajeros" component={Pasajeros}/>
                <Route path="/aeropuertos" component={Aeropuertos}/>
            </Router>
        </div>
    </MuiThemeProvider>
);


export default Routes;