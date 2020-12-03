import React, { Component } from 'react'

export class FormularioInvernadero extends Component {

    handleChange = (event) => {
        console.log(event.target.id);
        this.props.handleInfoChange(event.target.name, event.target.value);
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <label>Tipo de invernadero</label>
                    <select className="form-control" defaultValue="Tipo 1">
                        <option>Tipo 1</option>
                        <option>Tipo 2</option>
                    </select>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col">
                        <label>Altura</label>
                        <input className="form-control" name="altura" onBlur={this.handleChange}></input>
                        <small className="form-text text-muted">Altura del invernadero en centímetros (cms)</small>
                    </div>
                    <div className="col">
                        <label>Ancho</label>
                        <input className="form-control" name="ancho" onBlur={this.handleChange}></input>
                        <small className="form-text text-muted">Ancho del invernadero en centímetros (cms)</small>
                    </div>
                    <div className="col">
                        <label>Profundidad</label>
                        <input className="form-control" name="profundidad" onBlur={this.handleChange}></input>
                        <small className="form-text text-muted">Produndidad del invernadero en centímetros (cms)</small>
                    </div>
                </div>
            </div>
        )
    }
}

export default FormularioInvernadero
