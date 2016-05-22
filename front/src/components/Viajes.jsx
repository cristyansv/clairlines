/**
 * Created by Lauramv21 on 5/21/16.
 */
import React from 'react';

import Paper from 'material-ui/Paper';

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



class Viajes extends React.Component {

    constructor(){
        super();

        this.state = {
            viajes: []
        };

        var viajesFind = http.get('/getViajes');

        viajesFind.then(function (data) {
            this.setState({
                viajes: data
            });
        }.bind(this));


    }

    render() {

        var viajes = this.state.viajes.map(function (viaje) {
            return (
                <TableRow>
                    <TableRowColumn>{viaje.idviaje}</TableRowColumn>
                    <TableRowColumn>{viaje.idaeropuertoorigen}</TableRowColumn>
                    <TableRowColumn>{viaje.idaeropuertodestino}</TableRowColumn>
                    <TableRowColumn>{viaje.tarifa}</TableRowColumn>
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
                                <TableHeaderColumn>Aeropuerto Origen</TableHeaderColumn>
                                <TableHeaderColumn>Aeropuerto Destino</TableHeaderColumn>
                                <TableHeaderColumn>Tarifa (COP)</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {viajes}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default Viajes;
