/**
 * Created by Lauramv21 on 5/21/16.
 */

import React from 'react';
var http = require('../services/http');

class Pasajeros extends React.Component {

    constructor(){
        super();

        this.state = {
            pasajeros: []
        };

        var pasajerosFind = http.get('/getPasajeros');

        pasajerosFind.then(function (data) {
            this.setState({
                pasajeros: data
            });
        }.bind(this));


    }

    render() {

        var pasajeros = this.state.pasajeros.map(function (pasajero) {
            return (
                <div>
                    <p>Id: {pasajero.idpasajero}</p>
                    <p>nombre: {empleado.nombre}</p>
                    <p>cedula: {empleado.cedula}</p>
                </div>
            )
        });


        return (
            <div>
                {pasajeros}
            </div>
        )
    }
}

export default Pasajeros;
