import React, { Component } from 'react'
import FormularioCotizacion from './components/cotizacion/FormularioCotizacion';


export class App extends Component {
  render() {
    return (
      <div className="container">
        <header>
          <h1 className="row justify-content-center">Prototipo de formulario de cotizaciones</h1>
        </header>
        <FormularioCotizacion/>
      </div>
    )
  }
}

export default App

