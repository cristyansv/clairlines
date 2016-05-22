/**
 * Created by Lauramv21 on 5/21/16.
 */
import React from 'react';

import Paper from 'material-ui/Paper';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

var http = require('../services/http');

var style = {
    width: "980px",
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


class Trayectos extends React.Component {

    constructor(){
        super();

        this.state = {
            trayectos: []
        };

        var trayectosFind = http.get('/getTrayectos');

        trayectosFind.then(function (data) {
            this.setState({
                trayectos: data
            });
        }.bind(this));


    }

    render() {

        var trayectos = this.state.trayectos.map(function (trayecto) {
            return (


                <TableRow key={trayecto.idtrayecto}>
                    <TableRowColumn>{trayecto.idtrayecto}</TableRowColumn>
                    <TableRowColumn>{trayecto.idavion}</TableRowColumn>
                    <TableRowColumn>{trayecto.idviaje}</TableRowColumn>
                    <TableRowColumn>{trayecto.horasalida}</TableRowColumn>
                    <TableRowColumn>{trayecto.fechasalida}</TableRowColumn>
                    <TableRowColumn>{trayecto.horallegada}</TableRowColumn>
                    <TableRowColumn>{trayecto.fechallegada}</TableRowColumn>
                </TableRow>
            )
        });


        return (
            <div style={style}>
                <h1 style={titleStyle}>Trayectos</h1>
                <Paper style={containerStyle} zDepth={2}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>Avión</TableHeaderColumn>
                                <TableHeaderColumn>Viaje</TableHeaderColumn>
                                <TableHeaderColumn>Hora salida</TableHeaderColumn>
                                <TableHeaderColumn>Fecha salida</TableHeaderColumn>
                                <TableHeaderColumn>Hora llegada</TableHeaderColumn>
                                <TableHeaderColumn>Fecha llegada</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {trayectos}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default Trayectos;
