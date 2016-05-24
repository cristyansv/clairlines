/**
 * Created by Lauramv21 on 5/21/16.
 */

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


var buttonStyle ={
    marginTop: "20px",
    marginRight: "20px",
    width: "230px"
};



class Pasajeros extends React.Component {

    constructor(){
        super();
        
        this.selected = [];
        
        
        this.state = {
            pasajeros: [],
            open: false
        };


        this.newCedula = "";
        this.newNombre = "";


        this.handleClose = this.handleClose.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onChangeCedula = this.onChangeCedula.bind(this);
        this.fetchPasajeros = this.fetchPasajeros.bind(this);
        this.agregarPasajero = this.agregarPasajero.bind(this);
        this.selectRow = this.selectRow.bind(this);


        this.fetchPasajeros();
    }

    handleClose(){
        this.setState({
            open:false,
            nombre: "",
            cedula: ""
        })

    }


    fetchPasajeros(){
        var pasajerosFind = http.get('/getPasajeros');

        pasajerosFind.then(function (data) {

            console.log(data);

            this.setState({
                pasajeros: data.map(function(pasajero){

                return {
                    pasajero: pasajero,
                    selected: false
                }

            }),
                open: false

            });
        }.bind(this));

    }


    agregarPasajero(){


        var nombre = this.state.nombre;
        var cedula = this.state.cedula;


        var nuevoPasajero = http.post('/nuevoPasajero', {
            nombre: nombre,
            cedula: cedula

        });

        this.handleClose();

        nuevoPasajero.then(function (data) {
            this.fetchPasajeros();
        }.bind(this))


    }

    onClick(){
        this.setState({
            pasajeros: this.state.pasajeros,
            open:true
        })
    }

    onChangeCedula(e){
        this.setState({
            cedula: e.target.value
        })
    }

    onChangeNombre(e){
        this.setState({
            nombre: e.target.value
        });
    }


    selectRow(data){
        if(data == 'none'){
            this.setState({
                selectPasajeros: []
            })
        }else if(data == 'all'){

        }else if(data.length >0){


            var ids = [];

            var cloneState = this.state.pasajeros.slice();

            data.forEach(function (key) {
                cloneState[key].selected = true;
                ids.push(cloneState[key].pasajero.idpasajero);
            }.bind(this));

            this.selected = ids;

            this.setState({
                pasajeros: cloneState
            });

        }

    }

    render() {

        var pasajeros = this.state.pasajeros.map(function (data) {
            console.log(data);
            return (
                <TableRow key={data.pasajero.idpasajero} selected={data.selected}>
                    <TableRowColumn>{data.pasajero.idpasajero}</TableRowColumn>
                    <TableRowColumn>{data.pasajero.nombre}</TableRowColumn>
                    <TableRowColumn>{data.pasajero.cedula}</TableRowColumn>
                </TableRow>
            )
        });


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
                onTouchTap={this.agregarPasajero}
            />
        ];


        return (
            <div>
            <div style={style}>
                <h1 style={titleStyle}>Pasajeros</h1>
                <Paper style={containerStyle} zDepth={2}>
                    <Table multiSelectable={true} onRowSelection={this.selectRow}>
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
                <RaisedButton onClick={this.onClick} label="Agregar Pasajero" primary={true} style={buttonStyle} />
            </div>
                <Dialog
                    title="Agregar Nuevo Pasajero"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <TextField
                        floatingLabelText="Nombre"
                        onChange={this.onChangeNombre}
                    />
                    <TextField
                        floatingLabelText="Cédula"
                        onChange={this.onChangeCedula}
                    />
                </Dialog>
            </div>
        )
    }
}

export default Pasajeros;
