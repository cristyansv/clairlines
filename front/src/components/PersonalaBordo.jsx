/**
 * Created by Lauramv21 on 5/21/16.
 */
import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

var http = require('../services/http');

class PersonalaBordo extends React.Component {

    render() {
        
        var abordo = this.props.data.map(function (empleado) {
            return (
                <TableRow key={empleado.idempleado}>
                    <TableRowColumn>{empleado.idempleado}</TableRowColumn>
                    <TableRowColumn>{empleado.nombre} {empleado.apellido}</TableRowColumn>
                    <TableRowColumn>{empleado.cargo}</TableRowColumn>
                </TableRow>
            )
        });


        return(
            <Table selectable={false}>
                <TableHeader adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Cargo</TableHeaderColumn>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {abordo}
                </TableBody>
            </Table>
        )
    }
}

export default PersonalaBordo;
