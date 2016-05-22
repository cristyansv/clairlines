/**
 * Created by Lauramv21 on 5/21/16.
 */
import React from 'react';

import Paper from 'material-ui/Paper';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

var http = require('../services/http');

var style = {
    width: "1000px",
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


                <div>
                    <TableRow>{trayecto.idtrayecto}</TableRow>
                    <TableRow>{trayecto.idavion}</TableRow>
                    <TableRow>{trayecto.idviaje}</TableRow>
                    <TableRow>{trayecto.horasalida}</TableRow>
                    <TableRow>{trayecto.fechasalida}</TableRow>
                    <TableRow>{trayecto.horallegada}</TableRow>
                    <TableRow>{trayecto.fechallegada}</TableRow>
                </div>
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
