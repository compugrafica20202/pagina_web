import React, { Component } from 'react'
import FormularioCodornices from './FormularioCodornices';
import FormularioInvernadero from './FormularioInvernadero';
import axios from 'axios';

export class FormularioCotizacion extends Component {
    
    constructor() {
        super();
        const info_cliente_prueba = {nombre_cliente: "clientePrueba", cc_o_nit: 1001, es_empresa: true,
                                correo: "correo@prueba.com", departamento: "prueba", municipio: "prueba"};
        this.state = {producto: null, info_cliente: info_cliente_prueba,
                      info_invernadero: {}, info_alimentadora: {}};
    }
    
    enviar = () => {
        
        if (this.state.producto === "invernadero") {
            const data = Object.assign({}, {es_invernadero: true, tipo_invernadero: true},
                          this.state.info_cliente, this.state.info_invernadero)
            axios.post("/cotizacion", data)
            .then(res => console.log(res)).catch(error => console.log(error));
        }

    };

    changeDispositivo = (event) => {
        this.setState({producto: event.target.value});
    }

    changeInfoInvernadero = (field, value) => {
        const new_info = this.state.info_invernadero;
        new_info[field] = value;
        this.setState({info_invernadero: new_info});
        console.log(this.state)
    }

    render() {
        return (
            <div className="container">
               <form>
                   <div className="form-group">
                        <label>Escoge qué deseas cotizar</label>
                        <select className="form-control" onChange={this.changeDispositivo} defaultValue="">
                            <option></option>
                            <option value="invernadero">Mini - invernaderos</option>
                            <option value="alimentadora">Alimentadora de codornices</option>
                        </select>
                   </div>
                   {this.state.producto === "invernadero" && <FormularioInvernadero handleInfoChange={this.changeInfoInvernadero}/>}
                   {this.state.producto === "alimentadora" && <FormularioCodornices/>}
                </form> 
                <button className="btn btn-primary float-right" onClick={this.enviar}>Enviar</button>
            </div>
        )
    }
}

export default FormularioCotizacion
