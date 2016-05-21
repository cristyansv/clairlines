import React from 'react';
import { Router, Route, hashHistory } from 'react-router'
import Index from './components/Index.jsx';
import Aviones from './components/Aviones.jsx';

var Routes = (
    <Router history={hashHistory}>
        <Route path="/" component={Index}/>
        <Route path="/aviones" component={Aviones}/>
    </Router>
);

export default Routes;