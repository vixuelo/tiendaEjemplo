import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TiendaEjemplo } from './TiendaEjemplo'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <TiendaEjemplo/>
    </BrowserRouter>
)
