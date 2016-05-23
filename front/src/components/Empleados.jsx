import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

var http = require('../services/http');


var style = {
    width: "850px",
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
    marginRigth:"20px",
    width: "200px"
};


class Empleados extends React.Component {

    constructor(){
        super();

        this.selected = [];

        this.state = {
            empleados: [],
            open: false
        };


        this.newCedula = "";
        this.newNombre = "";
        this.newApellido = "";
        this.newIdcargo = 0;

        this.handleClose = this.handleClose.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onChangeCedula = this.onChangeCedula.bind(this);
        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onChangeApellido = this.onChangeApellido.bind(this);
        this.onChangeIdcargo = this.onChangeIdcargo.bind(this);
        this.fetchEmpleados = this.fetchEmpleados.bind(this);

        this.agregarEmpleado = this.agregarEmpleado.bind(this);
        this.selectRow = this.selectRow.bind(this);


        this.fetchEmpleados();
    }

    handleClose(){
        this.setState({
            open:false,
            cedula: "",
            nombre: "",
            apellido: "",
            idcargo: 0
        })

    }

    fetchEmpleados(){
        var empleadosFind = http.get('/getEmpleados');

        empleadosFind.then(function (data) {

            console.log(data);

            this.setState({
                empleados: data.map(function (empleado) {
                    return {
                        empleado: empleado,
                        selected: false
                    }
                }),
                open: false
            });
        }.bind(this));
    }

    agregarEmpleado(){

        var cedula = this.state.cedula;
        var nombre = this.state.nombre;
        var apellido = this.state.apellido;
        var idcargo = this.state.idcargo;


        var nuevoEmpleado = http.post('/nuevoEmpleado', {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            idcargo: idcargo
        });

        this.handleClose();

        nuevoEmpleado.then(function (data) {
            this.fetchEmpleados();
        }.bind(this))


    }

    onClick(){
        this.setState({
            empleados: this.state.empleados,
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

    onChangeApellido(e){
        this.setState({
            apellido: e.target.value
        });
    }

    onChangeIdcargo(e){
        this.setState({
            idcargo: e.target.value
        });
    }


    selectRow(data){
        if(data == 'none'){
            this.setState({
                selectEmpleados: []
            })
        }else if(data == 'all'){

        }else if(data.length >0){


            var ids = [];

            var cloneState = this.state.empleados.slice();

            data.forEach(function (key) {
                cloneState[key].selected = true;
                ids.push(cloneState[key].empleado.idempleado);
            }.bind(this));

            this.selected = ids;

            this.setState({
                empleados: cloneState,
            });

        }

    }



    render() {

        var empleados= this.state.empleados.map(function (data) {
            console.log(data);
            return (
                <TableRow key={data.empleado.idempleado} selected={data.selected}>
                    <TableRowColumn>{data.empleado.idempleado}</TableRowColumn>
                    <TableRowColumn>{data.empleado.cedula}</TableRowColumn>
                    <TableRowColumn>{data.empleado.nombre}</TableRowColumn>
                    <TableRowColumn>{data.empleado.apellido}</TableRowColumn>
                    <TableRowColumn>{data.empleado.idcargo}</TableRowColumn>
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
                onTouchTap={this.agregarEmpleado}
            />
        ];


        return (
            <div>
            <div style={style}>
                <h1 style={titleStyle}>Empleados</h1>
                <Paper style={containerStyle} zDepth={2}>
                    <Table multiSelectable={true} onRowSelection={this.selectRow}>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>Cédula</TableHeaderColumn>
                                <TableHeaderColumn>Nombre</TableHeaderColumn>
                                <TableHeaderColumn>Apellido</TableHeaderColumn>
                                <TableHeaderColumn>Cargo</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {empleados}
                        </TableBody>
                    </Table>
                </Paper>
                <RaisedButton onClick={this.onClick} label="Agregar Empleado" primary={true} style={buttonStyle} />
            </div>
                <Dialog
                title="Agregar Nuevo Empleado"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                 >
                <TextField
                    floatingLabelText="Cédula"
                    onChange={this.onChangeCedula}
                />
                 <TextField
                    floatingLabelText="Nombre"
                    onChange={this.onChangeNombre}
                  />
                    <TextField
                        floatingLabelText="Apellido"
                        onChange={this.onChangeApellido}
                    />
                    <TextField
                        floatingLabelText="Cargo"
                        onChange={this.onChangeIdcargo}
                    />
                </Dialog>
            </div>
        )
    }
}

export default Empleados;
