import React from 'react'
import { Field } from 'formik'
import { TextField, MenuItem, InputLabel, FormControl, Grid, Select } from '@material-ui/core'

export default function FormularioInvernadero(props) {
    
    return(
        <>
            <Grid item>
                <FormControl fullWidth variant="outlined">
                    <InputLabel>Tipo de invernadero</InputLabel>
                    <Field name="tipo_invernadero" type="select" as={Select} 
                        label="Tipo de invernadero"
                        error={props.formik.errors.tipo_invernadero && true}
                        margin="dense"
                    > 
                        <MenuItem value={false}>Tipo 1</MenuItem>
                        <MenuItem value={true}>Tipo 2</MenuItem>
                    </Field>
                </FormControl>
            </Grid>
            <Grid item container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Field 
                        id="altura" name="altura" type="text" as={TextField} variant="outlined"
                        label="Altura"
                        helperText={props.formik.errors.altura ? props.formik.errors.altura : "Altura en centímetros (cms)"}
                        error={props.formik.errors.altura && true}
                        fullWidth
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Field 
                        id="ancho" name="ancho" type="text" as={TextField} variant="outlined"
                        label="Ancho"
                        helperText="Ancho en centímetros (cms)"
                        error={props.formik.errors.ancho && true}
                        fullWidth
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Field 
                        id="profundidad" name="profundidad" type="text" as={TextField} variant="outlined"
                        label="Profundidad"
                        helperText="Profundidad en centímetros (cms)"
                        error={props.formik.errors.profundidad && true}
                        fullWidth
                        margin="dense"
                    />
                </Grid>
            </Grid>
        </>
    )
}