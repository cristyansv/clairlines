import React from 'react';

import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import Moment from 'momentjs';
var http = require('../services/http');

const container = {
    width: 700,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: "50px"
};

const title = {
    color: 'white',
    fontWeight: 100
};

const paper = {
    marginTop: "20px",
    backgroundColor: "RGBA(255,255,255,0.8)",
    padding: "40px",
    paddingTop: "20px"
};

const containerFlex = {
    display: 'flex'
};

const column = {
    width: '50%'
};

const desc = {
    color: "RGBA(208,2,27,1)",
    fontWeight: 100
};



class Index extends React.Component {

    constructor(){
        super();
        this.state = {
            auto: [],
            aeropuertos: [],
            hash: {},
            stringVuelo: "/buscarvuelos/"
        };

        var aeropuertosFind = http.get('/getAeropuertos');
        
        aeropuertosFind.then(function (data) {

            var auto = [];
            var hash = {};

            data.forEach(function (aeropuerto) {

                auto.push(aeropuerto.idaeropuerto);
                auto.push(aeropuerto.ciudad);
                auto.push(aeropuerto.nombreaeropuerto);

                hash[aeropuerto.idaeropuerto] = aeropuerto.idaeropuerto;
                hash[aeropuerto.ciudad] = aeropuerto.idaeropuerto;
                hash[aeropuerto.nombreaeropuerto] = aeropuerto.idaeropuerto;

            }.bind(this));



            this.setState({
                aeropuertos: data,
                auto: auto,
                hash: hash
            });




        }.bind(this));
        this.handleOrigen = this.handleOrigen.bind(this);
        this.handleDestino = this.handleDestino.bind(this);
        this.handleSalida = this.handleSalida.bind(this);
        this.handleRetorno = this.handleRetorno.bind(this);
    }

    handleOrigen(value, a, b){
        this.setState({
            origenValue: this.state.hash[value]
        });
    }

    handleDestino(value){
        this.setState({
            destinoValue: this.state.hash[value]
        });
    }



    handleSalida(data, fecha){
        var fechaSalida = Moment(new Date(fecha)).format("YYYY-MM-DD");

        this.setState({
            fechaSalida: fechaSalida
        });

    }

    handleRetorno(data, fecha){
        var fechaSalida = Moment(new Date(fecha)).format("YYYY-MM-DD");

        this.setState({
            fechaRetorno: fechaSalida
        });

    }


    render(){
        return (
            <div style={container}>
                <h1 style={title}>Buscar Vuelos</h1>
                <Paper zDepth={2} style={paper}>
                    <div style={containerFlex}>
                        <div  style={column}>
                            <AutoComplete
                                openOnFocus={true}
                                animated={true}
                                filter={AutoComplete.fuzzyFilter}
                                floatingLabelText="Origen"
                                floatingLabelStyle={desc}
                                dataSource={this.state.auto}
                                onNewRequest={this.handleOrigen}
                            />
                            <DatePicker
                                floatingLabelStyle={desc}
                                floatingLabelText="Fecha Salida"
                                onChange={this.handleSalida}
                                mode="landscape" />
                        </div>
                        <div style={column}>
                            <AutoComplete
                                disableFocusRipple={false}
                                openOnFocus={true}
                                animated={true}
                                filter={AutoComplete.fuzzyFilter}
                                floatingLabelText="Destino"
                                floatingLabelStyle={desc}
                                dataSource={this.state.auto}
                                onNewRequest={this.handleDestino}
                            />
                            <DatePicker
                                floatingLabelStyle={desc}
                                floatingLabelText="Fecha Retorno"
                                onChange={this.handleRetorno}
                                mode="landscape" />
                        </div>

                    </div>
                    <br/>
                    <Link to={this.state.stringVuelo + this.state.origenValue + "/" + this.state.destinoValue + "/" + this.state.fechaSalida + "/" + this.state.fechaRetorno}>
                        <RaisedButton label="Buscar Vuelos" primary={true} />
                    </Link>
                </Paper>
            </div>
        )
    }
}

export default Index;