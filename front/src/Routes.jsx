import React from 'react';
import { Router, Route, hashHistory } from 'react-router'
import Index from './components/Index.jsx';
import Aviones from './components/Aviones.jsx';
import Empleados from './components/Empleados.jsx';
import Pasajeros from './components/Pasajeros.jsx';
import Aeropuertos from './components/Aeropuertos.jsx';

import Tiquetes from './components/Tiquetes.jsx';
import Viajes from './components/Viajes.jsx';
import Trayectos from './components/Trayectos.jsx';


import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NuevoTrayecto from './components/NuevoTrayecto.jsx';
import BuscarVuelos from './components/BuscarVuelos.jsx';
import ViewTicket from './components/ViewTicket.jsx';

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
                <Route path="/viajes" component={Viajes}/>
                <Route path="/tiquetes" component={Tiquetes}/>
                <Route path="/trayectos" component={Trayectos}/>
                <Route path="/nuevotrayecto" component={NuevoTrayecto} />
                <Route path="/buscarvuelos/:origen/:destino/:inicial/:final" component={BuscarVuelos} />
                <Route path="/ticket/:ida/:regreso" component={ViewTicket} />
            </Router>
        </div>
    </MuiThemeProvider>
);


export default Routes;