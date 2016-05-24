import React from 'react';
import Paper from 'material-ui/Paper';

const ticketStyle = {
    marginBottom: "20px",
    padding: "20px"
}

class Ticket extends React.Component {

    constructor(props){
        super(props)

        console.log(this.props)
    }

    render(){

        var data = this.props.data;
        return (
            <Paper zDepth={2} style={ticketStyle}>
                Pasajero: {data.nombre}
            </Paper>
        )
    }
}

export default Ticket;