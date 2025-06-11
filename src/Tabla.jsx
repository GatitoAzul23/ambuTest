import { useState, useEffect, use } from 'react'
import { useNavigate } from 'react-router-dom'

function Tabla({park}) { //recibimos el park como prop
    
    //Variable de entono
    const url = import.meta.env.VITE_API_URL
    const auth = import.meta.env.VITE_AUTHORIZATION;
    const authAmbu = import.meta.env.VITE_AMBU_API_KEY;
    
    //Variable para navegar entre rutas
    const navigate = useNavigate()

    //Funcion para ver los detalles del parque, pasando como parametro el id
    const handleClickDetalle = (park) =>{
        navigate(`/parque/${park.id}`)
    }

    //Funcion para modificar los datos del parque, pasando como parametro el id
    const handleClickModificar = (park) =>{
        navigate(`/modificar/${park.id}`)
    }

    //Funcion para eliminar un parque, pasando como parametro el id
    const handleClickEliminar = (park) =>{
        fetch(`${url}/${park.id}`,{
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': auth,
            'Ambu-Private-Key': authAmbu
        }
        })
        .then(response =>{
            alert("El parque se ha eliminado correctamente")
            window.location.reload()
        })
        .catch(error=> console.error(error))
    }

    return (
        <>
            <div className='border-emerald-900 p-4 flex items-center'>
                <table className="styled-table">
                    <tbody>
                        <tr>
                            <th>Nombre</th>
                            <td>{park.park_name}</td>
                        </tr>
                        <tr>
                            <th>Domicilio</th>
                            <td>{park.park_address}</td>
                        </tr>
                        <tr>
                            <th>Ciudad</th>
                            <td>{park.park_city}</td>
                        </tr>    
                        <tr>
                            <th>Estado</th>
                            <td>{park.park_state}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="p-3">
                                <div className="flex justify-between w-full">
                                <button className='bg-blue-500 text-white px-4 py-2' onClick={() => {handleClickDetalle(park)}}>Ver más</button>
                                <button className='bg-yellow-400 text-white px-4 py-2' onClick={() =>{handleClickModificar(park)}}>Modificar</button>
                                <button className='bg-red-800 text-white px-4 py-2' onClick={() =>{handleClickEliminar(park)}}>Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div className="imagen px-4">
                    <img className="img-fluid" src="/images/parque.png" alt={park.park_img_uri} />
                    <h4>Imagen:</h4>
                    <p>{park.park_img_uri}</p>
                </div>
            </div>
            
        </>
    )
}

export default Tabla