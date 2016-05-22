/**
 * Created by Lauramv21 on 5/21/16.
 */

import React from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

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


var buttonStyle ={
    marginTop: "20px",
    marginRight: "20px",
    width: "230px"
};



class Pasajeros extends React.Component {

    constructor(){
        super();

        this.state = {
            pasajeros: []
        };

        var pasajerosFind = http.get('/getPasajeros');

        pasajerosFind.then(function (data) {
            this.setState({
                pasajeros: data
            });
        }.bind(this));


    }

    render() {

        var pasajeros = this.state.pasajeros.map(function (pasajero) {
            return (
                <TableRow key={pasajero.idpasajero}>
                    <TableRowColumn>{pasajero.idpasajero}</TableRowColumn>
                    <TableRowColumn>{pasajero.nombre}</TableRowColumn>
                    <TableRowColumn>{pasajero.cedula}</TableRowColumn>
                </TableRow>
            )
        });


        return (
            <div style={style}>
                <h1 style={titleStyle}>Pasajeros</h1>
                <Paper style={containerStyle} zDepth={2}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>Nombre</TableHeaderColumn>
                                <TableHeaderColumn>Cédula</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pasajeros}
                        </TableBody>
                    </Table>
                </Paper>
                <RaisedButton label="Agregar Pasajero" primary={true} style={buttonStyle} />
                <RaisedButton label="Borrar Pasajero" secondary={true} style={buttonStyle} />
            </div>
        )
    }
}

export default Pasajeros;
