import React from 'react';

import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import ContentInbox from 'material-ui/svg-icons/action/flight-takeoff';
import Plane from 'material-ui/svg-icons/content/inbox';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Moment from 'momentjs';
import TextField from 'material-ui/TextField';
import {hashHistory} from 'react-router';

var http = require('../services/http');

const container = {
    width: 700,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: "50px",
    marginTop: "50px"
};

const title = {
    color: 'white',
    fontWeight: 100
};

const paper = {
    marginTop: "20px",
    backgroundColor: "RGBA(255,255,255,0.8)",
    padding: "40px",
    paddingTop: "20px"
};

const containerFlex = {
    display: 'flex'
};

const column = {
    width: '50%'
};

const desc = {
    color: "RGBA(208,2,27,1)",
    fontWeight: 100
};

const price ={
    color: "#093",
    textAlign: 'center'
};

const buttonStyle = {
    marginBottom: 20
};

class Index extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0,
            vuelosIda: [],
            vuelosRegreso: []
        };

        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.renderStepActions = this.renderStepActions.bind(this)
        this.send = this.send.bind(this);
        this.handleNombre = this.handleNombre.bind(this);
        this.handleCedula = this.handleCedula.bind(this);


        console.log(this.props);

        var findIda = http.post('/findVuelo', {
            origen: this.props.params.origen,
            destino: this.props.params.destino,
            fecha: this.props.params.inicial
        });

        findIda.then(function (data) {
            this.setState({
                vuelosIda: data
            });
        }.bind(this));

        var findRegreso = http.post('/findVuelo', {
            origen: this.props.params.destino,
            destino: this.props.params.origen,
            fecha: this.props.params.final
        });

        findRegreso.then(function (data) {
            this.setState({
                vuelosRegreso: data
            });
        }.bind(this))


    }

    handleCedula(e){
        this.setState({
            personaCedula: e.target.value
        })
    }

    handleNombre(e){
        this.setState({
            personaNombre: e.target.value
        })
    }

    send(){
        var send = http.post('/nuevoTicket', {
            ida: this.state.vueloIdaId,
            regreso: this.state.vueloRegresoId,
            cedula: this.state.personaCedula,
            nombre: this.state.personaNombre
        });

        send.then(function (data) {
            hashHistory.push(`/ticket/${data.ida}/${data.regreso}`);
        })

    }

    handleNext() {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev(){
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    handleSelecIda(vuelo){
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
            vueloIdaId: vuelo.idtrayecto
        });
    }

    handleSelecRegreso(vuelo){
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
            vueloRegresoId: vuelo.idtrayecto
        });
    }

    renderStepActions(step) {
        const {stepIndex} = this.state;

        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onTouchTap={this.handleNext}
                    style={{marginRight: 12}}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onTouchTap={this.handlePrev}
                    />
                )}
            </div>
        );
    }


    render(){


        const vuelosIda = this.state.vuelosIda.map(function (vuelo) {
            var date = Moment(new Date(vuelo.fechasalida)).format('YYYY-MM-DD');
            return (
                <ListItem
                    key={vuelo.idtrayecto}
                    onClick={this.handleSelecIda.bind(this, vuelo)}
                    primaryText={vuelo.idaeropuertoorigen + " - " + vuelo.idaeropuertodestino}
                    secondaryText={date + " " +vuelo.horasalida}
                    rightIcon={<ContentInbox />}
                    leftIcon={<p style={price}>${vuelo.tarifa} USD</p>}
                />
            );
        }.bind(this));


        const vuelosRegreso = this.state.vuelosRegreso.map(function (vuelo) {
            var date = Moment(new Date(vuelo.fechasalida)).format('YYYY-MM-DD');
            return (
                <ListItem
                    key={vuelo.idtrayecto}
                    onClick={this.handleSelecRegreso.bind(this, vuelo)}
                    primaryText={vuelo.idaeropuertoorigen + " - " + vuelo.idaeropuertodestino}
                    secondaryText={date + " " +vuelo.horasalida}
                    rightIcon={<ContentInbox />}
                    leftIcon={<p style={price}>${vuelo.tarifa} USD</p>}
                />
            );
        }.bind(this));

        const {finished, stepIndex} = this.state;

        return (
            <Paper style={container}>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>Seleccione su vuelo de salida</StepLabel>
                        <StepContent>
                            <List>
                                {vuelosIda}
                            </List>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Selecione su vuelo de regreso</StepLabel>
                        <StepContent>
                            <List>
                                {vuelosRegreso}
                            </List>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Sus datos personales</StepLabel>
                        <StepContent>
                            <TextField
                                onChange={this.handleNombre}
                                floatingLabelText="Nombre"
                            />
                            <TextField
                                onChange={this.handleCedula}
                                floatingLabelText="Cedula"
                            />
                            <br/>
                            <RaisedButton onClick={this.send} label="Comprar Vuelo" primary={true} style={buttonStyle}/>
                        </StepContent>
                    </Step>
                </Stepper>
            </Paper>
        )
    }
}

export default Index;