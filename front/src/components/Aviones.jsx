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
    width: "190px",
    marginBottom: "50px"
};


class Aviones extends React.Component {

    constructor(){
        super();

        this.selected = [];

        this.state = {
            aviones: [],
            open:false
        };

        this.newModelo = "";
        this.newAsientos = 0;

        this.handleClose = this.handleClose.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onChangeModelo = this.onChangeModelo.bind(this);
        this.onChangeAsientos = this.onChangeAsientos.bind(this);
        this.fetchAviones = this.fetchAviones.bind(this);

        this.agregarAvion = this.agregarAvion.bind(this);
        this.selectRow = this.selectRow.bind(this);
        this.desactivar = this.desactivar.bind(this);
        this.activar = this.activar.bind(this);



        this.fetchAviones();
    }

    handleClose(){
        this.setState({
            open:false,
            asientos: "",
            modelo: 0
        })
    }

    fetchAviones(){
        var avionesFind = http.get('/getAviones');

        avionesFind.then(function (data) {

            console.log(data);
            this.setState({
                aviones: data.map(function (avion) {


                    return {
                        avion: avion,
                        selected: false
                    }
                }),
                open: false
            });
        }.bind(this));
    }

    agregarAvion(){

        var modelo = this.state.modelo;
        var asientos = this.state.asientos;


        var nuevoAvion = http.post('/nuevoAvion', {
            nroasientos: asientos,
            disponibilidad: 1,
            modelo: modelo
        });

        this.handleClose();

        nuevoAvion.then(function (data) {
            this.fetchAviones();
        }.bind(this))


    }

    onClick(){
        this.setState({
            aviones: this.state.aviones,
            open:true
        })
    }

    onChangeModelo(e){
        this.setState({
            modelo: e.target.value
        })
    }

    onChangeAsientos(e){
        this.setState({
            asientos: e.target.value
        });
    }

    selectRow(data){
        if(data == 'none'){
            this.setState({
                selectAviones: []
            })
        }else if(data == 'all'){

        }else if(data.length >0){


            var ids = [];

            var cloneState = this.state.aviones.slice();

            data.forEach(function (key) {
                cloneState[key].selected = true;
                ids.push(cloneState[key].avion.idavion);
            }.bind(this));

            this.selected = ids;

            this.setState({
                aviones: cloneState,
            });

        }

    }

    desactivar(e){
        e.preventDefault();
        
        var des = http.post('/deshabilitar', {
            aviones: this.selected
        });

        des.then(function (data) {
            this.fetchAviones();
        }.bind(this));

    }

    activar(e){
        e.preventDefault();

        var des = http.post('/activar', {
            aviones: this.selected
        });

        des.then(function (data) {
            this.fetchAviones();
        }.bind(this));

    }

    render() {

        // console.log(this.state.aviones);

        var aviones = this.state.aviones.map(function (data) {
            return (
                    <TableRow key={data.avion.idavion} selected={data.selected}>
                        <TableRowColumn>{data.avion.idavion}</TableRowColumn>
                        <TableRowColumn>{data.avion.modelo}</TableRowColumn>
                        <TableRowColumn>{data.avion.disponibilidad}</TableRowColumn>
                        <TableRowColumn>{data.avion.nroasientos}</TableRowColumn>
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
                onTouchTap={this.agregarAvion}
            />
        ];

        return (
            <div>
            <div style={style}>
                <h1 style={titleStyle}>Aviones</h1>
                <Paper containerStyle={containerStyle} zDepth={2}>
                    <Table multiSelectable={true} onRowSelection={this.selectRow}>
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
                <RaisedButton onClick={this.onClick} label="Agregar Avion" primary={true} style={buttonStyle} />
                <RaisedButton onClick={this.desactivar} label="Desactivar Aviones" secondary={true} style={buttonStyle} />
                <RaisedButton onClick={this.activar} label="Activar Aviones" primary={true} style={buttonStyle} />
            </div>
                <Dialog
                    title="Agregar Nuevo Avion"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <TextField
                        floatingLabelText="Modelo"
                        onChange={this.onChangeModelo}
                    />
                    <TextField
                        onChange={this.onChangeAsientos}
                        floatingLabelText="Asientos"
                    />
                </Dialog>
            </div>
        )
    }
}

export default Aviones;