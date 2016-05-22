import React from 'react';

import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Divider from 'material-ui/Divider';
import PersonalaBordo from './PersonalaBordo.jsx';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const containerStyle = {
    width: 700,
    marginRight: 'auto',
    marginLeft: 'auto'

};

const paperStyle ={
    padding: "20px"
};

const titleStyle = {
    color: "white",
    fontWeight: 100,
    fontSize: "50px"
};

const desc = {
    margin: 0,
    color:'RGBA(0,0,0,0.5)'
};

class NuevoTrayecto extends React.Component {
    render(){
        return (
            <div style={containerStyle}>
                <h1 style={titleStyle}>Nuevo Trayecto</h1>
                <Paper zDepth={2} style={paperStyle}>
                    <p style={desc}>Fecha Salida</p>
                    <DatePicker hintText="Date Picker" mode="landscape"/>
                    <p style={desc}>Fecha llegada</p>
                    <DatePicker hintText="Date Picker" mode="landscape" />
                    <p style={desc}>Hora Salida</p>
                    <TimePicker
                        hintText="12hr Format"
                    />
                    <p style={desc}>Hora LLegada</p>
                    <TimePicker
                        hintText="12hr Format"
                    />
                    <br/>
                    <p>Personal a Bordo</p>
                    <PersonalaBordo />
                    <SelectField onChange={this.handleChange}>
                        <MenuItem value={1} primaryText="Never" />
                        <MenuItem value={2} primaryText="Every Night" />
                        <MenuItem value={3} primaryText="Weeknights" />
                        <MenuItem value={4} primaryText="Weekends" />
                        <MenuItem value={5} primaryText="Weekly" />
                    </SelectField>
                    <br/>
                    <RaisedButton label="Agregar Tripulacion" primary={true}  />
                </Paper>
            </div>
        )
    }
}

export default NuevoTrayecto;