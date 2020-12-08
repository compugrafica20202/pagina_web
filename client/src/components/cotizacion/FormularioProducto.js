import React from 'react'
import FormularioCodornices from './FormularioCodornices';
import FormularioInvernadero from './FormularioInvernadero';
import { Grid, InputLabel, MenuItem, Select, FormControl } from "@material-ui/core"
import { Field } from 'formik';

function FormularioProducto(props) {
    return (
        <>
            <Grid item>
                <FormControl fullWidth variant="outlined">
                    <InputLabel>Selecciona tu producto</InputLabel>
                    <Field name="es_invernadero" type="select" as={Select} 
                        label="Selecciona tu producto" 
                        margin="dense"
                    >
                        <MenuItem value={true}>Mini - invernaderos</MenuItem>
                        <MenuItem value={false}>Alimentadora de codornices</MenuItem>
                    </Field>
                </FormControl>
            </Grid>
            {(props.formik.values.es_invernadero === true) && <FormularioInvernadero formik={props.formik}/>}
            {(props.formik.values.es_invernadero === false) && <FormularioCodornices formik={props.formik}/>}
        </>
    )
}

export default FormularioProducto
