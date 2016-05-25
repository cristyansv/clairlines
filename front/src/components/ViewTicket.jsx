import React from 'react';
import Ticket from './Ticket.jsx';

var http = require('../services/http');

const container = {
    marginTop: '50px',
    width: "700px",
    marginLeft: 'auto',
    marginRight: 'auto'
};

class ViewTicket extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ida: {},
            regreso: {},
            tickets: []
        };


        var tickets = http.post('/viewTicket', {
            ida: this.props.params.ida,
            regreso: this.props.params.regreso
        });

        tickets.then(function (data) {
            this.setState({
                tickets: data
            })
        }.bind(this));

    }

    render() {

        var tickets = this.state.tickets.map(function (ticket) {
            //console.log(ticket);
            return (
                <Ticket key={ticket.idtrayecto} data={ticket}/>
                /*<TableRow key={ticket.idtrayecto} data={ticket}>
                    <TableRowColumn>{ticket.idtiquete}</TableRowColumn>
                    <TableRowColumn>{ticket.nombre}</TableRowColumn>
                    <TableRowColumn>{ticket.idtrayecto}</TableRowColumn>
                    <TableRowColumn>{ticket.idavion}</TableRowColumn>
                    <TableRowColumn>{ticket.fechasalida}</TableRowColumn>
                    <TableRowColumn>{ticket.horasalida}</TableRowColumn>
                    <TableRowColumn>{ticket.fechallegada}</TableRowColumn>
                    <TableRowColumn>{ticket.horallegada}</TableRowColumn>
                    */
                //</TableRow>
            )
        });

        return (
           <div style={container}>
             {tickets}
            </div>


 /*               <div style={container}>
                  <h1 style={titleStyle}>Tiquete</h1>
                    <Paper style={containerStyle} zDepth={2}>
                        <TableHeader>
                            <TableRow>
                                 <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>Nombre</TableHeaderColumn>
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

                </div>*/
        )
    }
}

export default ViewTicket;