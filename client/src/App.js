import { Grid, Typography } from '@material-ui/core';
import React, { Component } from 'react'
import FormularioCotizacion from './components/cotizacion/FormularioCotizacion';


export class App extends Component {
    render() {
        return (
            <div>
                <Typography variant="h4" align="center">Prototipo de formulario de cotizaciones</Typography>
                <br/>
                <Grid container justify="center">
                    <Grid item xs={11} sm={9} lg={7}>
                      <FormularioCotizacion/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default App

