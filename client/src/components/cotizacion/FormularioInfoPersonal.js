import React from "react";
import {
  Button,
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import { Field } from "formik";
import colombia from "./colombia.json";

const FormularioInfoPersonal = (props) => {
  return (
    <>
      <Grid item container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12} sm={6}>
          <Field
            name="nombre_cliente"
            type="text"
            as={TextField}
            variant="outlined"
            label={
              props.formik.values.es_empresa
                ? "Nombre empresa"
                : "Nombre y apellidos"
            }
            error={props.formik.errors.nombre_cliente && true}
            helperText={props.formik.errors.nombre_cliente}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} sm={6} container justify="center">
          <FormControlLabel
            control={
              <Field
                name="es_empresa"
                type="checkbox"
                as={Checkbox}
                color="primary"
              />
            }
            label="Empresa"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="cc_o_nit"
            type="text"
            as={TextField}
            variant="outlined"
            label="CC/ NIT"
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="correo"
            type="text"
            as={TextField}
            variant="outlined"
            label="Correo"
            error={props.formik.errors.correo && true}
            helperText={props.formik.errors.correo}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            variant="outlined"
            error={props.formik.errors.departamento && true}
          >
            <InputLabel>Departamento</InputLabel>
            <Field
              name="departamento"
              type="select"
              as={Select}
              variant="outlined"
              label="Departamento"
              margin="dense"
            >
              {colombia.map((element, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={element.departamento}
                    onClick={() => props.formik.setFieldValue("municipio", "")}
                  >
                    {element.departamento}
                  </MenuItem>
                );
              })}
            </Field>
            {props.formik.errors.departamento && (
              <FormHelperText>
                {props.formik.errors.departamento}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            variant="outlined"
            error={props.formik.errors.municipio && true}
          >
            <InputLabel>Municipio</InputLabel>
            <Field
              name="municipio"
              type="select"
              as={Select}
              variant="outlined"
              label="Municipio"
              margin="dense"
            >
              {props.formik.values.departamento &&
                colombia
                  .find(
                    (dep) =>
                      dep.departamento === props.formik.values.departamento
                  )
                  .ciudades.map((element, index) => {
                    return (
                      <MenuItem key={index} value={element}>
                        {element}
                      </MenuItem>
                    );
                  })}
            </Field>
            {props.formik.errors.municipio && (
              <FormHelperText>{props.formik.errors.municipio}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
      <Grid item container justify="space-evenly">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => props.setEnInfoPersonal(false)}
        >
          Atrás
        </Button>
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
};

export default FormularioInfoPersonal;
