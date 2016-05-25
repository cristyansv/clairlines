import React from 'react';

import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Divider from 'material-ui/Divider';
import PersonalaBordo from './PersonalaBordo.jsx';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import Moment from 'momentjs';

var http = require('../services/http');
var utils = require('../services/utils');

const containerStyle = {
    width: 700,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: "50px"
};

const paperStyle ={
    padding: "20px",
};

const titleStyle = {
    color: "white",
    fontWeight: 100,
    fontSize: "50px"
};

const desc = {
    margin: 0,
    color:'RGBA(0,0,0,0.5)'
};

const trayectoStyle = {
    textAlign: 'center',
    fontWeight: 100,
};

const addTrayectoStyle = {
    marginTop: "20px"
};

class NuevoTrayecto extends React.Component {

    constructor(){
        super();

        this.state = {
            empleados: [],
            abordo: [],
            aviones: [],
            viajes: [],
            idtrayecto: utils.generateID()
        };

        this.fetchData = this.fetchData.bind(this);
        this.handleChangeEmpleado = this.handleChangeEmpleado.bind(this);
        this.addEmpleado= this.addEmpleado.bind(this);
        this.handleChangeAvion = this.handleChangeAvion.bind(this);
        this.handleChangeViaje = this.handleChangeViaje.bind(this);
        this.addTrayecto = this.addTrayecto.bind(this);
        this.handleFechaSalida = this.handleFechaSalida.bind(this);
        this.handleFechaLLegada = this.handleFechaLLegada.bind(this);
        this.handleHoraSalida = this.handleHoraSalida.bind(this);
        this.handleHoraLlegada = this.handleHoraLlegada.bind(this);

        this.fetchData();

    }

    handleHoraSalida(data, hora){
        this.setState({
            horaSalida: Moment(new Date(hora)).format("h:mm")
        });
    }

    handleHoraLlegada(data, hora){
        this.setState({
            horaLlegada: Moment(new Date(hora)).format("h:mm")
        });
    }

    handleFechaSalida(data, fecha){
        var fechaSalida = Moment(new Date(fecha)).format("YYYY-MM-DD");

        this.setState({
            fechaSalida: fechaSalida
        });

    }

    handleFechaLLegada(data, fecha){
        var fechaLlegada = Moment(new Date(fecha)).format("YYYY-MM-DD");

        this.setState({
            fechaLlegada: fechaLlegada
        });

    }

    addEmpleado(){
        var clone = this.state.abordo.slice();
        clone.push(this.state.empleados[this.state.actualEmpleadoIndex]);

        this.setState({
            abordo: clone
        });

    }

    handleChangeEmpleado(event, index, value){
        this.setState({
            actualEmpleado: value,
            actualEmpleadoIndex: index
        });

    }

    handleChangeAvion(event, index, value){
        this.setState({
            actualAvion: value,
            actualAvionIndex: index
        });
    }

    handleChangeViaje(event, index, value){
        this.setState({
            actualViaje: value,
            actualViajeIndex: index
        });
    }

    fetchData(){
        var findEmpelados = http.get('/getempleados');

        findEmpelados.then(function (data) {
            this.setState({
                empleados: data
            });
        }.bind(this));

        var avionesFind = http.get('/getaviones');

        avionesFind.then(function (data) {
            this.setState({
                aviones: data
            });
        }.bind(this));


        var viajeFind = http.get('/getViajes');

        viajeFind.then(function (data) {
            this.setState({
                viajes: data
            });
        }.bind(this));

    }

    addTrayecto(){
        var add = http.post('/nuevotrayecto', this.state);

        add.then(function (data) {
            console.log(data);
        })

    }

    render(){


        const empleados =  this.state.empleados.map(function (empleado) {
            var line = empleado.nombre + " - " + empleado.cargo;
            return (
                <MenuItem key={empleado.idempleado} value={empleado.idempleado} primaryText={line} />
            )
        });
        
        const aviones = this.state.aviones.map(function (avion) {
            return ( <MenuItem key={avion.idavion} value={avion.idavion} primaryText={avion.modelo} /> );
        });

        const viajes = this.state.viajes.map(function (viaje) {

            var via = viaje.idaeropuertoorigen + " - " + viaje.idaeropuertodestino;

            return ( <MenuItem key={viaje.idviaje} value={viaje.idviaje} primaryText={via} /> );''
        });

        return (
            <div style={containerStyle}>
                <h1 style={titleStyle}>Nuevo Trayecto</h1>
                <Paper zDepth={2} style={paperStyle}>
                    <h2 style={trayectoStyle}>Trayecto - {this.state.idtrayecto}</h2>
                    <hr/>
                    <h4>Itinerario</h4>
                    <p style={desc} >Fecha Salida</p>
                    <DatePicker hintText="Date Picker" mode="landscape" onChange={this.handleFechaSalida}/>
                    <p style={desc}>Fecha llegada</p>
                    <DatePicker hintText="Date Picker" mode="landscape" onChange={this.handleFechaLLegada}/>
                    <p style={desc}>Hora Salida</p>
                    <TimePicker
                        format="24hr"
                        onChange={this.handleHoraSalida}
                        hintText="Hora Salida"
                    />
                    <p style={desc}>Hora LLegada</p>
                    <TimePicker
                        onChange={this.handleHoraLlegada}
                        format="24hr"
                        hintText="Hora Llegada"
                    />
                    <br/>
                    <h4>Personal a Bordo</h4>
                    <PersonalaBordo  data={this.state.abordo}/>
                    <SelectField value={this.state.actualEmpleado} onChange={this.handleChangeEmpleado}>
                        {empleados}
                    </SelectField>
                    <br/>
                    <RaisedButton onClick={this.addEmpleado} label="Agregar Tripulacion" primary={true}  />
                    <hr/>
                    <h4>Selecionar Avion</h4>
                    <SelectField value={this.state.actualAvion} onChange={this.handleChangeAvion}>
                        {aviones}
                    </SelectField>
                    <h4>Viaje</h4>
                    <SelectField value={this.state.actualViaje} onChange={this.handleChangeViaje}>
                        {viajes}
                    </SelectField>
                </Paper>
                <RaisedButton onClick={this.addTrayecto} label="Agregar Trayecto" primary={true} style={addTrayectoStyle}  />
            </div>
        )
    }
}

export default NuevoTrayecto;