import React from "react";
import FormularioCodornices from "./FormularioCodornices";
import FormularioInvernadero from "./FormularioInvernadero";
import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  TextField,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { Field } from "formik";

function FormularioProducto(props) {
  return (
    <>
      <Grid item>
        <FormControl
          fullWidth
          variant="outlined"
          error={props.formik.errors.es_invernadero && true}
        >
          <InputLabel>Selecciona tu producto</InputLabel>
          <Field
            name="es_invernadero"
            type="select"
            as={Select}
            label="Selecciona tu producto"
            margin="dense"
            validate={(value) => {
              let error;
              if (value === "") error = "Selecciona un producto";
              return error;
            }}
            onChange={async (event) => {
              await props.formik.handleChange(event);
              props.formik.validateField("es_invernadero");
            }}
          >
            <MenuItem value={true}>Mini - invernaderos</MenuItem>
            <MenuItem value={false}>Alimentadora de codornices</MenuItem>
          </Field>
          {props.formik.errors.es_invernadero && (
            <FormHelperText>
              {props.formik.errors.es_invernadero}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      {props.formik.values.es_invernadero === true && (
        <FormularioInvernadero formik={props.formik} />
      )}
      {props.formik.values.es_invernadero === false && (
        <FormularioCodornices formik={props.formik} />
      )}
      <Grid container justify="center" item>
        <Field
          name="cc_o_nit"
          type="text"
          as={TextField}
          variant="outlined"
          label="CC/ NIT"
          helperText={props.formik.errors.cc_o_nit}
          error={props.formik.errors.cc_o_nit && true}
          fullWidth
          margin="dense"
        />
      </Grid>
      <Grid item container justify="center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => props.formik.validateForm()}
        >
          Enviar
        </Button>
      </Grid>
    </>
  );
}

export default FormularioProducto;
