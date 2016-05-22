import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

var http = require('../services/http');


var style = {
    width: "850px",
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


var buttonStyle ={
    marginTop: "20px",
    marginRigth:"20px",
    width: "170px"
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
                <TableRow>
                    <TableRowColumn>{empleado.idempleado}</TableRowColumn>
                    <TableRowColumn>{empleado.cedula}</TableRowColumn>
                    <TableRowColumn>{empleado.nombre}</TableRowColumn>
                    <TableRowColumn>{empleado.apellido}</TableRowColumn>
                    <TableRowColumn>{empleado.cargo}</TableRowColumn>
                    <TableRowColumn>{empleado.tipo}</TableRowColumn>
                    <TableRowColumn>{empleado.categoria}</TableRowColumn>
                </TableRow>
            )
        });


        return (
            <div style={style}>
                <h1 style={titleStyle}>Empleados</h1>
                <Paper style={containerStyle} zDepth={2}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Id</TableHeaderColumn>
                                <TableHeaderColumn>Cedula</TableHeaderColumn>
                                <TableHeaderColumn>Nombre</TableHeaderColumn>
                                <TableHeaderColumn>Apellido</TableHeaderColumn>
                                <TableHeaderColumn>Cargo</TableHeaderColumn>
                                <TableHeaderColumn>Tipo</TableHeaderColumn>
                                <TableHeaderColumn>Categoria</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {empleados}
                        </TableBody>
                    </Table>
                </Paper>
                <RaisedButton label="Agregar Empleado" primary={true} style={buttonStyle} />
                <RaisedButton label="Borrar Empleado" secondary={true} style={buttonStyle} />
            </div>
        )
    }
}

export default Empleados;
