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
               /* <div>
                    <p>Id: {tiquete.idtiquete}</p>
                    <p>Pasajero: {tiquete.idpasajero}</p>
                    <p>Trayecto: {tiquete.idtrayecto}</p>
                    <p>Precio: {tiquete.precio}</p>
                    <p>Fecha Salida: {trayecto.fechasalida}</p>
                    <p>Hora Salida: {trayecto.horasalida}</p>
                    <p>Fecha Llegada: {trayecto.fechallegada}</p>
                    <p>Hora Llegada: {trayecto.horallegada}</p>
                </div>*/


                <TableRow key={tiquete.idtrayecto} data={tiquete}>
                    <TableRowColumn>{tiquete.idtiquete}</TableRowColumn>
                    <TableRowColumn>{tiquete.idpasajero}</TableRowColumn>
                    <TableRowColumn>{tiquete.idtrayecto}</TableRowColumn>
                    <TableRowColumn>{tiquete.idavion}</TableRowColumn>
                    <TableRowColumn>{tiquete.fechasalida}</TableRowColumn>
                    <TableRowColumn>{tiquete.horasalida}</TableRowColumn>
                    <TableRowColumn>{tiquete.fechallegada}</TableRowColumn>
                    <TableRowColumn>{tiquete.horallegada}</TableRowColumn>

                 </TableRow>
            )
        });


        return (
            /*
            <div>
                {tiquetes}
            </div>*/
            <div style={container}>
                <h1 style={titleStyle}>Tiquete</h1>
                    <Paper style={containerStyle} zDepth={2}>
                        <TableHeader>
                            <TableRow>
                                 <TableHeaderColumn>ID</TableHeaderColumn>
                                 <TableHeaderColumn>Pasajero</TableHeaderColumn>
                                 <TableHeaderColumn>Trayecto</TableHeaderColumn>
                                 <TableHeaderColumn>Avion</TableHeaderColumn>
                                 <TableHeaderColumn>Fecha Salida</TableHeaderColumn>
                                 <TableHeaderColumn>Hora Salida</TableHeaderColumn>
                                 <TableHeaderColumn>Fecha Llegada</TableHeaderColumn>
                                 <TableHeaderColumn>Hora Llegada</TableHeaderColumn>
                            </TableRow>
                         </TableHeader>
                         <TableBody>
                            {empleados}
                         </TableBody>
                      </Paper>

            </div>

        )
    }
}

export default Tiquetes;



