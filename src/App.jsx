import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Tabla from './Tabla.jsx'
import './App.css'

function App() {
  //Estado para almacenar los parques y actualizar el estado
  const [parks, setParks] = useState([])
  
  //Variables de entorno
  const url = import.meta.env.VITE_API_URL
  const auth = import.meta.env.VITE_AUTHORIZATION;
  const authAmbu = import.meta.env.VITE_AMBU_API_KEY;
  
  //Variable para navegar entre rutas
  const navigate = useNavigate()

  //Uso del hook useEffect para hacer la petición a la API y obtener la lista de los parques
  //Este se ejecuta cuando el componente se renderiza por primera vez
  useEffect(()=>{
    fetch(url,{ 
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth,
        'Ambu-Private-Key': authAmbu
      }
    })
    .then(response =>  response.json())
    .then(data => {
    setParks(data.data),
    console.log(data)})
    .catch(error=> console.error(error))
  }, [])
  
  //Función para manejar la ruta de registro de un parque
  const handleClickAgregar = () =>{
    navigate('/registrar') 
  }

  return (
    <>    
      <div className="root container xl bg-emerald-600">
        <h1>AMBU- Agencia Metropolitana de Bosques Urbanos</h1>
        <div className="opciones pd-6 bg-white my-10">
          <div className="opcion">
            <button className="bg-emerald-900 text-white my-4" onClick={()=>{handleClickAgregar()}}>Agregar parque</button>
          </div>
          <div className="tabla py-4  px-4 my-4 mx-4">
            <h1 className='titulo my-3'>Lista de parques.</h1>
            <div className="divide-y divide-gray-100 rounded-lg">
              {/* usando el método map para recorrer el arreglo de parques obtenidos en la petición */}
              {parks.map((parque)=>{
                return (
                  // retorna el componente de Tabla y se le pasa el parque como prop
                  <Tabla 
                    key= {parque.id}
                    park = {parque}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
