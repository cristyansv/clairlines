import React from 'react';

var http = require('../services/http');

class Empleados extends React.Component {

    constructor(){
        super();

        this.state = {
            empleados: []
        };

        var empleadosFind = http.get('/getEmpleados');

        empleadosFind.then(function (data) {
            this.setState({
                empleados: data
            });
        }.bind(this));


    }

    render() {

        var empleados= this.state.empleados.map(function (empleado) {
            return (
                <div>
                    <p>Id: {empleado.idempleado}</p>
                    <p>cedula: {empleado.cedula}</p>
                    <p>nombre: {empleado.nombre}</p>
                    <p>apellido: {empleado.apellido}</p>
                    <p>cargo: {empleado.cargo}</p>
                    <p>tipo: {empleado.tipo}</p>
                    <p>categoria: {empleado.categoria}</p>
                </div>
            )
        });


        return (
            <div>
                {empleados}
            </div>
        )
    }
}

export default Empleados;
