/**
 * Created by Lauramv21 on 5/21/16.
 */
import React from 'react';

var http = require('../services/http');

class Tiquetes extends React.Component {

    constructor(){
        super();

        this.state = {
            tiquetes: []
        };

        var tiquetesFind = http.get('/getTiquetes');

        tiquetesFind.then(function (data) {
            this.setState({
                tiquetes: data
            });
        }.bind(this));


    }

    render() {

        var tiquetes = this.state.tiquetes.map(function (tiquete) {
            console.log(tiquete);
            return (
               <div>
                    <p>Id: {tiquete.idtiquete}</p>
                    <p>Pasajero: {tiquete.idpasajero}</p>
                    <p>Trayecto: {tiquete.idtrayecto}</p>
                    <p>Precio: {tiquete.precio}</p>
                    <p>Fecha Salida: {trayecto.fechasalida}</p>
                    <p>Hora Salida: {trayecto.horasalida}</p>
                    <p>Fecha Llegada: {trayecto.fechallegada}</p>
                    <p>Hora Llegada: {trayecto.horallegada}</p>
                </div>


            )
        });


        return (

            <div>
                {tiquetes}
            </div>
          

        )
    }
}

export default Tiquetes;



