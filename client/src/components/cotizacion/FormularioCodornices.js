import React, { Component } from 'react'

export class FormularioCodornices extends Component {
    render() {
        return (
            <div>
                <div className="form-group">
                    <div className="form-row justify-content-center">
                        <div className="col">
                            <label>Cantidad de líneas</label>
                            <input className="form-control"></input>
                        </div>
                        <div className="col">
                            <label>Cantidad de jaulas por línea</label>
                            <input className="form-control"></input>
                        </div>
                    </div>
                    <div className="form-row justify-content-center">
                        <div className="col">
                            <label>Cantidad de niveles</label>
                            <input className="form-control"></input>
                        </div>
                        <div className="col">
                            <label>Cantidad de aves</label>
                            <input className="form-control"></input>
                        </div>
                    </div>
                    <br/>
                    <div className="form-row justify-content-center">
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input"></input>
                            <label>Líneas enfrentadas</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FormularioCodornices
