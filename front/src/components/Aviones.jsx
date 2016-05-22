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
    width: "170px"
};


class Aviones extends React.Component {

    constructor(){
        super();

        this.state = {
            aviones: []
        };

        var avionesFind = http.get('/getAviones');
        
        avionesFind.then(function (data) {
            this.setState({
                aviones: data
            });
        }.bind(this));


    }

    render() {

        var aviones = this.state.aviones.map(function (avion) {
            return (
                    <TableRow>
                        <TableRowColumn>{avion.idavion}</TableRowColumn>
                        <TableRowColumn>{avion.modelo}</TableRowColumn>
                        <TableRowColumn>{avion.disponibilidad}</TableRowColumn>
                        <TableRowColumn>{avion.nroasientos}</TableRowColumn>
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
                                <TableHeaderColumn>Modelo</TableHeaderColumn>
                                <TableHeaderColumn>Estado</TableHeaderColumn>
                                <TableHeaderColumn>Asientos</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {aviones}
                        </TableBody>
                    </Table>
                </Paper>
                <RaisedButton label="Agregar Avion" primary={true} style={buttonStyle} />
                <RaisedButton label="Borrar Aviones" secondary={true} style={buttonStyle} />
            </div>
        )
    }
}

export default Aviones;