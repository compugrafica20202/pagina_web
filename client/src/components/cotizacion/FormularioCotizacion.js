import React, { useState } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { Formik, Form } from "formik";
import FormularioProducto from "./FormularioProducto";
import FormularioInfoPersonal from "./FormularioInfoPersonal";
import * as Yup from "yup";
import DialogoInfoCliente from "./DialogoInfoCliente";

import imgInvTipo0 from "../../assets/invTipo0.jpg";
import imgInvTipo1 from "../../assets/invTipo1.jpg";
import { Redirect } from "react-router-dom";

/* 
TODO: 
- Consultar límites en backend
*/

const invTipo1Limits = {
  altura: { min: 50, max: 150 },
  ancho: { min: 100, max: 300 },
  profundidad: { min: 100, max: 300 },
};

const invTipo2Limits = {
  altura: { min: 150, max: 300 },
  ancho: { min: 150, max: 300 },
  profundidad: { min: 100, max: 300 },
};

const codoLimits = {
  cantidad_lineas: { min: 1, max: 6 },
  cantidad_jaulas_por_linea: { min: 1, max: 10 },
  cantidad_aves: { min: 1, max: 20000 },
  cantidad_niveles: { min: 1, max: 6 },
};

const intValidation = (limits, parameter) => {
  return Yup.number()
    .typeError("Ingrese un número")
    .integer("Ingrese un número entero")
    .min(
      limits[parameter].min,
      `Ingrese un número mayor a ${limits[parameter].min}`
    )
    .max(
      limits[parameter].max,
      `Ingrese un número menor a ${limits[parameter].max}`
    );
};

const idValidation = () => {
  return Yup.number()
    .typeError("Identificación inválida")
    .integer("Identificación inválida")
    .positive("Identificación inválida");
};

const invTipo1Validacion = Yup.object().shape({
  altura: intValidation(invTipo1Limits, "altura"),
  ancho: intValidation(invTipo1Limits, "ancho"),
  profundidad: intValidation(invTipo1Limits, "profundidad"),
  cc_o_nit: idValidation(),
});

const invTipo2Validacion = Yup.object().shape({
  altura: intValidation(invTipo2Limits, "altura"),
  ancho: intValidation(invTipo2Limits, "ancho"),
  profundidad: intValidation(invTipo2Limits, "profundidad"),
  cc_o_nit: idValidation(),
});

const codoValidacion = Yup.object().shape({
  cantidad_lineas: intValidation(codoLimits, "cantidad_lineas"),
  cantidad_jaulas_por_linea: intValidation(
    codoLimits,
    "cantidad_jaulas_por_linea"
  ),
  cantidad_aves: intValidation(codoLimits, "cantidad_aves"),
  cantidad_niveles: intValidation(codoLimits, "cantidad_niveles"),
  cc_o_nit: idValidation(),
});

const infoPersonalValidacion = Yup.object().shape({
  nombre_cliente: Yup.string().required("Campo requerido"),
  cc_o_nit: idValidation(),
  correo: Yup.string().email("Correo inválido").required("Campo requerido"),
  departamento: Yup.string().required("Seleccione un departamento"),
  municipio: Yup.string().required("Seleccione un municipio"),
});

export const FormularioCotizacion = () => {
  const [enInfoPersonal, setEnInfoPersonal] = useState(false);
  const [msgInfoPersonal, setMsgInfoPersonal] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);

  const validation = async (values) => {
    const errors = {};

    if (!enInfoPersonal) {
      try {
        if (values.es_invernadero === true) {
          if (values.tipo_invernadero === false)
            await invTipo1Validacion.validate(values, { abortEarly: false });
          else if (values.tipo_invernadero === true)
            await invTipo2Validacion.validate(values, { abortEarly: false });
          else errors.tipo_invernadero = "Selecciona un modelo";
        } else if (values.es_invernadero === false) {
          await codoValidacion.validate(values, { abortEarly: false });
        } else {
          errors.es_invernadero = "Selecciona un producto";
        }
      } catch (err) {
        err.inner.forEach((element) => {
          Object.assign(errors, { [element.path]: element.errors[0] });
        });
      }
    } else {
      try {
        await infoPersonalValidacion.validate(values, { abortEarly: false });
      } catch (err) {
        err.inner.forEach((element) => {
          Object.assign(errors, { [element.path]: element.errors[0] });
        });
      }
    }
    return errors;
  };

  const submit = async (values, helpers) => {
    if (!enInfoPersonal) {
      try {
        const res = await axios.get(`/cliente/${values.cc_o_nit}`);
        const cliente = res.data;
        if (Object.keys(cliente).length === 0) {
          setEnInfoPersonal(true);
        } else {
          /*Senio(ra) ${nombre_cliente}, desea realizar la cotizacion con el correo ${correo}
                    para ser enviado a ${municipio}, ${departamento}*/
          setMsgInfoPersonal(
            `${cliente.es_empresa ? "Señores" : "Señor(a)"} ${
              cliente.nombre_cliente
            }: ` +
              `¿Desea realizar la cotización con el correo ${cliente.correo} para ser enviado a ` +
              `${cliente.municipio}, ${cliente.departamento}?`
          );
          setShowDialog(true);
          helpers.setFieldValue("es_empresa", cliente.es_empresa);
          helpers.setFieldValue("nombre_cliente", cliente.nombre_cliente);
          helpers.setFieldValue("departamento", cliente.departamento);
          helpers.setFieldValue("municipio", cliente.municipio);
        }
      } catch (err) {
        console.log("Error on submit: " + err);
      }
    } else {
      send(values);
    }
  };

  const send = async (values) => {
    try {
      const res = await axios.post("/cotizacion", values);
      console.log(res);
      setRedirectTo("/")
    } catch (error) {
      console.log(error);
    }
  };

  const decline = () => {
    setEnInfoPersonal(true);
  };

  return (
    <>
      {redirectTo && <Redirect to={redirectTo} />}
      <Formik
        initialValues={{
          es_invernadero: "",
          tipo_invernadero: "",
          profundidad: "",
          altura: "",
          ancho: "",
          cantidad_lineas: "",
          cantidad_jaulas_por_linea: "",
          cantidad_niveles: "",
          cantidad_aves: "",
          lineas_enfrentadas: "",
          nombre_cliente: "",
          cc_o_nit: "",
          es_empresa: false,
          correo: "",
          departamento: "",
          municipio: "",
        }}
        onSubmit={(values, helpers) => submit(values, helpers)}
        validateOnBlur={false}
        validateOnChange={false}
        validate={validation}
      >
        {(formik) => (
          <Form>
            <Grid container justify="center" spacing={4}>
              <Grid
                container
                justify="center"
                alignContent="center"
                item
                xs={12}
                sm={7}
                md={4}
              >
                {formik.values.es_invernadero === true &&
                  (() => {
                    if (formik.values.tipo_invernadero === true)
                      return (
                        <img
                          src={imgInvTipo1}
                          alt="Invernadero modelo 2"
                          style={{ width: "100%" }}
                        />
                      );
                    else if (formik.values.tipo_invernadero === false)
                      return (
                        <img
                          src={imgInvTipo0}
                          alt="Invernadero modelo 1"
                          style={{ width: "100%" }}
                        />
                      );
                  })()}
                {formik.values.es_invernadero === false && (
                  <img
                    src={imgInvTipo1}
                    alt="Alimentadora de codornices"
                    style={{ width: "100%" }}
                  />
                )}
              </Grid>

              <Grid
                container
                direction="column"
                alignContent="center"
                spacing={3}
                item
                xs={12}
                sm={9}
                md={8}
              >
                {!enInfoPersonal ? (
                  <FormularioProducto formik={formik} />
                ) : (
                  <FormularioInfoPersonal
                    formik={formik}
                    setEnInfoPersonal={setEnInfoPersonal}
                  />
                )}
              </Grid>
            </Grid>
            <DialogoInfoCliente
              open={showDialog}
              msg={msgInfoPersonal}
              changeOpen={setShowDialog}
              formik={formik}
              accept={send}
              decline={decline}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormularioCotizacion;
