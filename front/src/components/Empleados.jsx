import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import {Table, TableBody, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

var http = require('../services/http');


var style = {
    width: "700px",
    marginLeft: "auto",
    marginRight: "auto"
};


var titleStyle = {
    color: "white",
    fontWeigth: 100,
    fontSize: "50px"
};


var containerStyle = {
    padding: "10px"
};


class Empleados extends React.Component {

    constructor(){
        super();

        this.state = {
            empleados: []
        };

        var empleadosFind = http.get('/getEmpleados');

        empleadosFind.then(function (data) {
            this.setState({
                empleados: data
            });
        }.bind(this));


    }

    render() {

        var empleados= this.state.empleados.map(function (empleado) {
            return (
                <div>
                    <p>Id: {empleado.idempleado}</p>
                    <p>cedula: {empleado.cedula}</p>
                    <p>nombre: {empleado.nombre}</p>
                    <p>apellido: {empleado.apellido}</p>
                    <p>cargo: {empleado.cargo}</p>
                    <p>tipo: {empleado.tipo}</p>
                    <p>categoria: {empleado.categoria}</p>
                </div>
            )
        });


        return (
            <div>
                {empleados}
            </div>
        )
    }
}

export default Empleados;
