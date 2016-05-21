/**
 * Created by Lauramv21 on 5/21/16.
 */
import React from 'react';

var http = require('../services/http');

class Viajes extends React.Component {

    constructor(){
        super();

        this.state = {
            viajes: []
        };

        var viajesFind = http.get('/getViajes');

        viajesFind.then(function (data) {
            this.setState({
                viajes: data
            });
        }.bind(this));


    }

    render() {

        var viajes = this.state.viajes.map(function (viaje) {
            return (
                <div>
                    <p>Id: {viaje.idviaje}</p>
                    <p>Aeropuerto_origen: {viaje.idaeropuertoorigen}</p>
                    <p>Aeropuerto_destino: {viaje.idaeropuertodestino}</p>
                    <p>Tarifa: {viaje.tarifa}</p>
                </div>
            )
        });


        return (
            <div>
                {viajes}
            </div>
        )
    }
}

export default Viajes;
