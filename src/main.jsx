import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TiendaEjemplo } from './TiendaEjemplo'
import './styles.css'
import { MyContextProvider } from './Context/MyContextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
<MyContextProvider>
<BrowserRouter>
    <TiendaEjemplo/>
    </BrowserRouter>
  </MyContextProvider>
    
)
