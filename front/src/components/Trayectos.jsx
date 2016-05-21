/**
 * Created by Lauramv21 on 5/21/16.
 */
import React from 'react';

var http = require('../services/http');

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
                    <p>Id: {trayecto.idtrayecto}</p>
                    <p>Avion: {trayecto.idavion}</p>
                    <p>Viaje: {trayecto.idviaje}</p>
                    <p>Hora salida: {trayecto.horasalida}</p>
                    <p>Fecha salida: {trayecto.fechasalida}</p>
                    <p>Hora llegada: {trayecto.horallegada}</p>
                    <p>Fecha llegada: {trayecto.fechallegada}</p>
                </div>
            )
        });


        return (
            <div>
                {trayectos}
            </div>
        )
    }
}

export default Trayectos;
