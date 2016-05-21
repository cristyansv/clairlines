var http = require('../services/http');

class Aeropuertos extends React.Component {

    constructor(){
        super();

        this.state = {
            pasajeros: []
        };

        var aeropuertosFind = http.get('/getAeropuertos');

        aeropuertosFind.then(function (data) {
            this.setState({
                aeropuertos: data
            });
        }.bind(this));


    }

    render() {

        var aeropuertos = this.state.aeropuertos.map(function (aeropuerto) {
            return (
                <div>
                    <p>Id: {aeropuerto.idaeropuerto}</p>
                    <p>nombre: {aeropuerto.nombreaeropuerto}</p>
                    <p>ciudad: {aeropuerto.ciudad}</p>
                </div>
            )
        });


        return (
            <div>
                {aeropuertos}
            </div>
        )
    }
}

export default Aeropuertos;
