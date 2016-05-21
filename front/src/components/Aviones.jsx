
import React from 'react';
var http = require('../services/http');

class Aviones extends React.Component {

    constructor(){
        super();

        this.state = {
            aviones: []
        };

        var avionesFind = http.get('/getAviones');
        
        avionesFind.then(function (data) {
            this.setState({
                aviones: data
            });
        }.bind(this));


    }

    render() {

        var aviones = this.state.aviones.map(function (avion) {
            return (
                <div>
                    <p>Modelo: {avion.modelo}</p>
                    <p>Id: {avion.idavion}</p>
                </div>
            )
        });


        return (
            <div>
                {aviones}
            </div>
        )
    }
}

export default Aviones;