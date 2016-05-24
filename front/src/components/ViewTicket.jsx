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
            return (
                <Ticket key={ticket.idtrayecto} data={ticket}/>
            )
        });

        return (
            <div style={container}>
                {tickets}
            </div>
        )
    }
}

export default ViewTicket;