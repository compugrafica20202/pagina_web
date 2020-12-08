import React from 'react'
import { Checkbox, Grid, TextField, FormControlLabel } from '@material-ui/core'
import { Field } from 'formik'

function FormularioInfoPersonal(props) {
    return (
        <>
            <Grid item container justify="center" alignItems="center" spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Field 
                        name="nombre_cliente" type="text" as={TextField} variant="outlined"
                        label={props.formik.values.es_empresa ? "Nombre empresa" : "Nombre y apellidos"}
                        fullWidth
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12} sm={6} container justify="center">
                    <FormControlLabel
                        control={<Field name="es_empresa" type="checkbox" as={Checkbox} color="primary"/>}
                        label="Empresa"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field 
                        name="cc_o_nit" type="text" as={TextField} variant="outlined"
                        label="CC/ NIT"
                        fullWidth
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Field 
                        name="correo" type="text" as={TextField} variant="outlined"
                        label="Correo"
                        fullWidth
                        margin="dense"
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default FormularioInfoPersonal
