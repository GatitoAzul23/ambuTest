import { StrictMode } from 'react'
import { BrowserRouter as Router ,Routes, Route} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Detalle from './Detalle.jsx'
import Formulario from './Formulario.jsx'
import Modificar from './Modificar.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* Declaracion del enrutador y de las rutas */}
    <Router>
        <Routes>
          <Route path="/" element={<App/>} />
          <Route path="/parque/:id" element={<Detalle />} />
          <Route path="/registrar" element={<Formulario />} />
          <Route path="/modificar/:id" element={<Modificar/>}/>
        </Routes>
      </Router>
  </StrictMode>,
)
