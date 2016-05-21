/**
 * Created by Lauramv21 on 5/21/16.
 */
import React from 'react';

var http = require('../services/http');

class PersonalaBordo extends React.Component {

    constructor(){
        super();

        this.state = {
            personalabordo: []
        };

        var personalabordoFind = http.get('/getPersonalaBordo');

        personalabordoFind.then(function (data) {
            this.setState({
                personalabordo: data
            });
        }.bind(this));


    }

    render() {

        var personalabordo = this.state.personalabordo.map(function (personal) {
            return (
                <div>
                    <p>Empleado: {personal.idempleado}</p>
                    <p>Trayecto: {personal.idtrayecto}</p>
                </div>
            )
        });


        return (
            <div>
                {personalabordo}
            </div>
        )
    }
}

export default PersonalaBordo;
