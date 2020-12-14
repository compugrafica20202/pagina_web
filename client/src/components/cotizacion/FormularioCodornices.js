import React from "react";
import { Checkbox, Grid, TextField, FormControlLabel } from "@material-ui/core";
import { Field } from "formik";

export const FormularioCodornices = (props) => {
  return (
    <>
      <Grid item container justify="center" spacing={2}>
        <Grid item xs={12} sm={6}>
          <Field
            name="cantidad_lineas"
            type="text"
            as={TextField}
            variant="outlined"
            label="Líneas"
            helperText={props.formik.errors.cantidad_lineas}
            error={props.formik.errors.cantidad_lineas && true}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="cantidad_jaulas_por_linea"
            type="text"
            as={TextField}
            variant="outlined"
            label="Jaulas por línea"
            helperText={props.formik.errors.cantidad_jaulas_por_linea}
            error={props.formik.errors.cantidad_jaulas_por_linea && true}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="cantidad_aves"
            type="text"
            as={TextField}
            variant="outlined"
            label="Cantidad de aves"
            helperText={props.formik.errors.cantidad_aves}
            error={props.formik.errors.cantidad_aves && true}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="cantidad_niveles"
            type="text"
            as={TextField}
            variant="outlined"
            label="Niveles"
            helperText={props.formik.errors.cantidad_niveles}
            error={props.formik.errors.cantidad_niveles && true}
            fullWidth
            margin="dense"
          />
        </Grid>
      </Grid>
      <Grid item container justify="center">
        <FormControlLabel
          control={
            <Field
              name="lineas_enfrentadas"
              type="checkbox"
              as={Checkbox}
              color="primary"
            />
          }
          label="Líneas enfrentadas"
        />
      </Grid>
    </>
  );
};

export default FormularioCodornices;
