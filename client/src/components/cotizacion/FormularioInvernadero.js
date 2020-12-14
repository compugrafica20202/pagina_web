import React from "react";
import { Field } from "formik";
import {
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Select,
  FormHelperText,
} from "@material-ui/core";

export default function FormularioInvernadero(props) {
  return (
    <>
      <Grid item>
        <FormControl
          fullWidth
          variant="outlined"
          error={props.formik.errors.tipo_invernadero && true}
        >
          <InputLabel>Tipo de invernadero</InputLabel>
          <Field
            name="tipo_invernadero"
            type="select"
            as={Select}
            label="Tipo de invernadero"
            error={props.formik.errors.tipo_invernadero && true}
            margin="dense"
            validate={(value) => {
              let error;
              if (value === "") error = "Selecciona un modelo";
              return error;
            }}
            onChange={async (event) => {
              await props.formik.handleChange(event);
              props.formik.validateField("tipo_invernadero");
            }}
          >
            <MenuItem value={false}>Modelo 1</MenuItem>
            <MenuItem value={true}>Modelo 2</MenuItem>
          </Field>
          {props.formik.errors.tipo_invernadero && (
            <FormHelperText>
              {props.formik.errors.tipo_invernadero}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={12} md={4}>
          <Field
            id="altura"
            name="altura"
            type="text"
            as={TextField}
            variant="outlined"
            label="Altura"
            helperText={
              props.formik.errors.altura
                ? props.formik.errors.altura
                : "Altura en centímetros (cms)"
            }
            error={props.formik.errors.altura && true}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Field
            id="ancho"
            name="ancho"
            type="text"
            as={TextField}
            variant="outlined"
            label="Ancho"
            helperText={
              props.formik.errors.ancho
                ? props.formik.errors.ancho
                : "Ancho en centímetros (cms)"
            }
            error={props.formik.errors.ancho && true}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Field
            id="profundidad"
            name="profundidad"
            type="text"
            as={TextField}
            variant="outlined"
            label="Profundidad"
            helperText={
              props.formik.errors.profundidad
                ? props.formik.errors.profundidad
                : "Profundidad en centímetros (cms)"
            }
            error={props.formik.errors.profundidad && true}
            fullWidth
            margin="dense"
          />
        </Grid>
      </Grid>
    </>
  );
}
