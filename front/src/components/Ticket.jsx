import React from 'react';
import Paper from 'material-ui/Paper';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import Moment from 'momentjs';

const ticketStyle = {
    marginBottom: "20px",
    padding: "20px"
}

const red = {
    color: "#d72c1d"
};
const flexCont ={
    display: "flex",
    width: "100%"
};

const col = {
    width: "40%"
};
const last = {
    flexGrow: 2,
    textAlign: 'right'
};
const separator = {
     flexGrow: 1,
    textAlign: 'center',
 };

const code = {
    fontWeight: 100,
    fontSize: 54,
    fontFamily: "'Lato', sans-serif"
};
const subhead = {
    color: "#b12a3b",
    margin: 0,
    marginBottom: "-10px"
};
const iconStyles = {
    marginTop: 20,
    fontSize: "40px",
    height: "44px",
    width: "44px"
};

const vueloSub = {
    color: "#b12a3b",
    margin: 0,
};

class Ticket extends React.Component {

    constructor(props){
        super(props);

        console.log(this.props)
    }

    render(){

        var data = this.props.data;
        return (
            <Paper zDepth={2} style={ticketStyle}>
                <div style={flexCont}>
                    <div>
                        <span style={red}>CL</span> AIRLINES
                    </div>
                    <div style={last}>
                        <p style={vueloSub}>vuelo</p>
                        <p>{data.idtrayecto}</p>
                    </div>
                </div>
                <br/>
                <div style={flexCont}>
                    <div style={col}>
                        <p style={subhead}>{data.origenAeropuerto}</p>
                        <p style={code}>{data.idaeropuertoorigen}</p>
                    </div>
                    <div style={separator}>
                        <ActionFlightTakeoff style={iconStyles} color={"c21b33"} />
                    </div>
                    <div style={last}>
                        <p style={subhead}>{data.destinoAeropuerto}</p>
                        <p style={code}>{data.idaeropuertodestino}</p>
                    </div>
                </div>

                <hr/>
                <div>
                    <div style={flexCont}>
                        <div style={col}>
                            <p style={vueloSub}>Nombre</p>
                            <p>{data.nombre}</p>
                        </div>
                        <div style={col}>
                            <div style={flexCont}>
                                <div style={col}>
                                <p style={vueloSub}>fecha:</p>
                                <p>{Moment(new Date(data.fechasalida)).format("DD/MM/YY")}</p>
                            </div>
                                <div style={col}>
                                    <p style={vueloSub}>Hora:</p>
                                    <p>{data.horasalida}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
        )
    }
}

export default Ticket;