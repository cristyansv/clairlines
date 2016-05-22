import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import React from 'react';
import TextField from 'material-ui/TextField';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


var http = require('../services/http');

var style = {
    width: "700px",
    marginLeft: "auto",
    marginRight: "auto"
};


var titleStyle = {
    color: "white",
    fontWeight: 100,
    fontSize: "50px"
};


var containerStyle = {
    padding: "10px"
};



class Viajes extends React.Component {

    constructor(){
        super();

        this.state = {
            viajes: [],
            open: false,
            aeropuertos: [],
            tarifa: 0
        };

        this.handleChangeOrigen = this.handleChangeOrigen.bind(this);
        this.handleChangeDestino = this.handleChangeDestino.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.agregarViaje = this.agregarViaje.bind(this);
        this.handleChangeTarifa = this.handleChangeTarifa.bind(this);
        this.fetchViajes = this.fetchViajes.bind(this);

        this.fetchViajes();
    }

    fetchViajes(){
        var viajesFind = http.get('/getViajes');

        viajesFind.then(function (data) {
            console.log(data);

            this.setState({
                viajes: data
            });
        }.bind(this));

        var aeropuertosFind = http.get('/getAeropuertos');

        aeropuertosFind.then(function (data) {
            this.setState({
                aeropuertos: data
            });
        }.bind(this));
    }

    handleChangeOrigen(event, index, value){
        this.setState({
            origen: value
        });
    }

    handleChangeDestino(event, index, value){
        this.setState({
            destino: value
        });
    }

    handleChangeTarifa(e){
        this.setState({
            tarifa: e.target.value
        })
    }

    handleClose(){
        this.setState({
            open: false
        })
    }

    handleOpen(){
        this.setState({
            open: true
        })
    }

    agregarViaje(){
        var origen = this.state.origen;
        var destino = this.state.destino;
        var tarifa = this.state.tarifa;

        var addTarifa = http.post('/nuevoViaje', {
            origen: origen,
            destino: destino,
            tarifa: tarifa
        });

        this.setState({
            open: false
        });
        
        addTarifa.then(function (data) {
            this.fetchViajes();
        }.bind(this));

    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Agregar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.agregarViaje}
            />
        ];

        var viajes = this.state.viajes.map(function (viaje) {
            return (
                <TableRow key={viaje.idviaje}>
                    <TableRowColumn>{viaje.idviaje}</TableRowColumn>
                    <TableRowColumn>{viaje.idaeropuertoorigen}</TableRowColumn>
                    <TableRowColumn>{viaje.idaeropuertodestino}</TableRowColumn>
                    <TableRowColumn>{viaje.tarifa}</TableRowColumn>
                </TableRow>
            )
        });

        var aeropuertos = this.state.aeropuertos.map(function (aeropuerto) {
            return (
                <MenuItem key={aeropuerto.idaeropuerto} value={aeropuerto.idaeropuerto} primaryText={aeropuerto.idaeropuerto} />
            )
        });


        return (
            <div>
                <div style={style}>
                    <h1 style={titleStyle}>Viajes</h1>
                    <Paper style={containerStyle} zDepth={2}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Aeropuerto Origen</TableHeaderColumn>
                                    <TableHeaderColumn>Aeropuerto Destino</TableHeaderColumn>
                                    <TableHeaderColumn>Tarifa (USD)</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {viajes}
                            </TableBody>
                        </Table>
                    </Paper>
                    <RaisedButton label="Agregar Viaje" primary={true} style={style} onClick={this.handleOpen} />
                </div>
                <Dialog
                    title="Agregar Nuevo viaje"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <SelectField value={this.state.origen} onChange={this.handleChangeOrigen} floatingLabelText="Origen">
                        {aeropuertos}
                    </SelectField>
                    <br/>
                    <SelectField value={this.state.destino} onChange={this.handleChangeDestino} floatingLabelText="Destino">
                        {aeropuertos}
                    </SelectField>
                    <br/>
                    <TextField
                        onChange={this.handleChangeTarifa}
                        value={this.state.tarifa}
                        floatingLabelText="Tarifa"
                    />
                </Dialog>
            </div>
        )
    }
}

export default Viajes;
