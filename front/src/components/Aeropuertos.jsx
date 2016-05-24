import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

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
            aeropuertos: [],
            open: false
        };

        this.fetchAeropuertos = this.fetchAeropuertos.bind(this);
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onChangeCiudad = this.onChangeCiudad.bind(this);
        this.openAgregarAeropuerto = this.openAgregarAeropuerto.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.AgregarAeropuerto = this.AgregarAeropuerto.bind(this);

        this.fetchAeropuertos();

    }

    fetchAeropuertos(){
        var aeropuertosFind = http.get('/getAeropuertos');

        aeropuertosFind.then(function (data) {

            console.log(data);

            this.setState({
                aeropuertos: data
            });
        }.bind(this));
    }

    onChangeId(e){
        this.setState({
            id: e.target.value
        })
    }

    onChangeNombre(e){
        this.setState({
            nombre: e.target.value
        })
    }

    onChangeCiudad(e){
        this.setState({
            ciudad: e.target.value
        })
    }

    openAgregarAeropuerto(){
        this.setState({
            open: true
        })
    }

    handleClose(){
        this.setState({
            open: false
        });
    }

    AgregarAeropuerto(){

        var addAeropuerto = http.post('/nuevoAeropuerto', {
            id: this.state.id,
            nombre: this.state.nombre,
            ciudad: this.state.ciudad
        });

        this.setState({
            open: false
        });

        addAeropuerto.then(function (data) {
            console.log(data);
            this.fetchAeropuertos();
        }.bind(this));

    }



    render() {

        var aeropuertos = this.state.aeropuertos.map(function (aeropuerto) {
            return (
                <TableRow key={aeropuerto.idaeropuerto}>
                    <TableRowColumn>{aeropuerto.idaeropuerto}</TableRowColumn>
                    <TableRowColumn>{aeropuerto.nombreaeropuerto}</TableRowColumn>
                    <TableRowColumn>{aeropuerto.ciudad}</TableRowColumn>
                </TableRow>
            )
        });

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onMouseDown={this.handleClose}
            />,
            <FlatButton
                label="Agregar"
                primary={true}
                keyboardFocused={true}
                onMouseDown={this.AgregarAeropuerto}

            />
        ];


        return (
            <div>
                <div style={style}>
                    <h1 style={titleStyle}>Aeropuertos</h1>
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
                    <RaisedButton onClick={this.openAgregarAeropuerto} label="Agregar Aeropuerto" primary={true} style={buttonStyle} />
                </div>
                <Dialog
                    title="Agregar nuevo Aeropuerto"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <TextField
                        floatingLabelText="ID"
                        onChange={this.onChangeId}
                    />
                    <br/>
                    <TextField
                        onChange={this.onChangeNombre}
                        floatingLabelText="Nombre"
                    />
                    <br/>
                    <TextField
                        onChange={this.onChangeCiudad}
                        floatingLabelText="Ciudad"
                    />
                </Dialog>
            </div>
        )
    }
}

export default Aeropuertos;
