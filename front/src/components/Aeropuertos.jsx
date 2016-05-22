import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


var http = require('../services/http');

var style = {
    width: "700px",
    marginLeft: "auto",
    marginRight: "auto",

};

var titleStyle = {
    color: 'white',
    fontWeight: 100,
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

class Aeropuertos extends React.Component {

    constructor(){
        super();

        this.state = {
            aeropuertos: []
        };

        var aeropuertosFind = http.get('/getAeropuertos');

        aeropuertosFind.then(function (data) {
            this.setState({
                aeropuertos: data
            });
        }.bind(this));


    }

    render() {

        var aeropuertos = this.state.aeropuertos.map(function (aeropuerto) {
            return (
                <TableRow>
                    <TableRowColumn>{aeropuerto.idaeropuerto}</TableRowColumn>
                    <TableRowColumn>{aeropuerto.nombreaeropuerto}</TableRowColumn>
                    <TableRowColumn>{aeropuerto.ciudad}</TableRowColumn>
                </TableRow>
            )
        });


        return (
            <div style={style}>
                <h1 style={titleStyle}>Aviones</h1>
                <Paper containerStyle={containerStyle} zDepth={2}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>Nombre</TableHeaderColumn>
                                <TableHeaderColumn>Ciudad</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {aeropuertos}
                        </TableBody>
                    </Table>
                </Paper>
                <RaisedButton label="Agregar Aeropuerto" primary={true} style={buttonStyle} />
                <RaisedButton label="Borrar Aeropuerto" secondary={true} style={buttonStyle} />
            </div>
        )
    }
}

export default Aeropuertos;
