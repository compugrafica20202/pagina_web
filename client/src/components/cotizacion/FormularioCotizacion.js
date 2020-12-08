import React, { useState } from 'react'
import axios from 'axios'
import { Grid, Button, TextField } from "@material-ui/core"
import { Formik, Form, Field } from 'formik'
import FormularioProducto from './FormularioProducto'
import FormularioInfoPersonal from './FormularioInfoPersonal'
import * as Yup from 'yup'
import DialogoInfoCliente from './DialogoInfoCliente'

/* 
TODO: 
- Implementar departamentos y municipios
- Implementar validacion de informacion personal
- Topbar
- Guardar en base de datos las solicitudes
- Consultar límites en backend
*/

const invTipo1Limits = {
    altura: {min: 20, max: 120},
    ancho: {min: 20, max: 120},
    profundidad: {min: 20, max: 120}
}

const invTipo2Limits = {
    altura: {min: 50, max: 150},
    ancho: {min: 50, max: 150},
    profundidad: {min: 50, max: 150}
}

const codoLimits = {
    cantidad_lineas: {min: 1, max: 20},
    cantidad_jaulas_por_linea: {min: 1, max: 50},
    cantidad_aves: {min: 1, max: 200},
    cantidad_niveles: {min: 1, max: 10}
}

const intValidation = (limits, parameter) => {
    return Yup.number()
        .typeError("Ingrese un número")
        .integer("Ingrese un entero")
        .min(limits[parameter].min, `Debe ser mayor a ${limits[parameter].min}`)
        .max(limits[parameter].max, `Debe ser menor a ${limits[parameter].max}`)
}

const idValidation = () => {
    return Yup.number()
        .typeError("Identificación inválida")
        .integer("Identificación inválida")
        .positive("Identificación invalida")
}

export const FormularioCotizacion = () => {
    
    const [enInfoPersonal, setEnInfoPersonal] = useState(false);
    const [msgInfoPersonal, setMsgInfoPersonal] = useState("Error msg");
    const [showDialog, setShowDialog] = useState(false);
 
    const invTipo1Validacion = Yup.object().shape({
        altura: intValidation(invTipo1Limits, "altura"),
        ancho: intValidation(invTipo1Limits, "ancho"),
        profundidad: intValidation(invTipo1Limits, "profundidad"),
        cc_o_nit: idValidation()
    })

    const invTipo2Validacion = Yup.object().shape({
        altura: intValidation(invTipo2Limits, "altura"),
        ancho: intValidation(invTipo2Limits, "ancho"),
        profundidad: intValidation(invTipo2Limits, "profundidad"),
        cc_o_nit: idValidation()
    })

    const codoValidacion = Yup.object().shape({
        cantidad_lineas: intValidation(codoLimits, "cantidad_lineas"),
        cantidad_jaulas_por_linea: intValidation(codoLimits, "cantidad_jaulas_por_linea"),
        cantidad_aves: intValidation(codoLimits, "cantidad_aves"),
        cantidad_niveles: intValidation(codoLimits, "cantidad_niveles"),
        cc_o_nit: idValidation()
    })

    const validation = async (values) => {
        const errors = {}
        
        if (!enInfoPersonal) {
            try {
                if (values.es_invernadero) {
                    if (!values.tipo_invernadero)
                        await invTipo1Validacion.validate(values, {abortEarly: false})
                    else 
                        await invTipo2Validacion.validate(values, {abortEarly: false})
                } else if (values.es_invernadero === false) {
                    await codoValidacion.validate(values, {abortEarly: false})
                } else {
                    errors.es_invernadero = "Seleccione un invernadero"
                }
            } catch (err) {
                err.inner.forEach(element => {
                    Object.assign(errors, {[element.path]: element.errors[0]})
                })
            }
        }
        return errors
    }

    const submit = async (values, helpers) => {
        if (!enInfoPersonal) {
            try {
                const res = await axios.get(`/cliente/${values.cc_o_nit}`)
                const cliente = res.data
                if (Object.keys(cliente).length === 0) {
                    setEnInfoPersonal(true)
                } else {
                    /*Senio(ra) ${nombre_cliente}, desea realizar la cotizacion con el correo ${correo}
                    para ser enviado a ${municipio}, ${departamento}*/
                    setMsgInfoPersonal(`${cliente.es_empresa ? "Señores" : "Señor(a)"} ${cliente.nombre_cliente}: `
                    + `¿Desea realizar la cotización con el correo ${cliente.correo} para ser enviado a `
                    + `${cliente.municipio}, ${cliente.departamento}?`)
                    setShowDialog(true)
                    helpers.setFieldValue("es_empresa", cliente.es_empresa)
                    helpers.setFieldValue("nombre_cliente", cliente.nombre_cliente)
                    helpers.setFieldValue("departamento", cliente.departamento)
                    helpers.setFieldValue("municipio", cliente.municipio)
                }
            } catch (err) {
                console.log("Error on submit: " + err)   
            }
        }
    }

    const back = () => {
        setEnInfoPersonal(false)
    }

    const send = (values) => {
        axios.post("/cotizacion", values)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

    const decline = () => {
        setEnInfoPersonal(true)
    }

    return (
        <div>
            <Formik
                initialValues={{es_invernadero: true, tipo_invernadero: false, profundidad: "", altura: "", ancho: "",
                cantidad_lineas: "", cantidad_jaulas_por_linea: "", cantidad_niveles: "", cantidad_aves: "", lineas_enfrentadas: "",
                nombre_cliente: "", cc_o_nit: "", es_empresa: false, correo: "", departamento: "", municipio: ""}}
                onSubmit={(values, helpers) => submit(values, helpers)}
                validateOnBlur={false}
                validateOnChange={false}
                validate={validation}
            >
            {(formik) => (
                <Form>
                <Grid container direction="column" alignContent="center" spacing={3}>
                    { !enInfoPersonal ?
                    <FormularioProducto formik={formik}/> :
                    <FormularioInfoPersonal formik={formik}/>
                    }
                    <Grid item container justify="space-around">
                        {enInfoPersonal ?
                        <Button 
                            variant="contained" color="secondary"
                            onClick={back}
                        >
                            Atrás
                        </Button>
                        :
                        <Grid item container justify="center">
                            <Field 
                                name="cc_o_nit" type="text" as={TextField} variant="outlined"
                                label="CC/ NIT"
                                helperText={formik.errors.cc_o_nit}
                                error={formik.errors.cc_o_nit && true}
                                fullWidth
                                margin="dense"
                            />
                        </Grid>
                        }
                        <Button type="submit" variant="contained" color="primary" onClick={() => formik.validateForm()}>Enviar</Button>
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
        </div>
    )
}

export default FormularioCotizacion