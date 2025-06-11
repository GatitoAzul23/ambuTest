import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Detalle(){
    //Estado para almacenar los datos del parque, se inicializa como un objeto vacío
    const [parque, setParque] = useState({});
    
    //Variables de entorno
    const url = import.meta.env.VITE_API_URL
    const auth = import.meta.env.VITE_AUTHORIZATION;
    const authAmbu = import.meta.env.VITE_AMBU_API_KEY;

    //Declaración de variable para navegar entre rutas
    const navigate = useNavigate();

    //Hook para obtener el id desde la URL
    const {id} = useParams();

    //Hook para hacer la patición a la API y obtener los datos del parque según el id 
    useEffect(()=>{
        fetch(`${url}/${id}`,{
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
            if (!data.data) {
                alert('No se encontró el parque');
                navigate('/');
            } else {
                setParque(data.data);
            }
        })
        .catch(error=> console.error(error))
    }, [id])

    //Función para manejar la acción de regresar
    const handleClickRegresar = ()=> {
        navigate('/')
    }

    return(
        <>
            <div className="w-full">
                <h1 className="mb-10">Detalle del parque</h1>
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
                        <div className="flex gap-4 flex-col">
                            <div className="flex gap-4 flex-col">
                                <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                                    {/* agregando la información del parque */}
                                Nombre: <br />{parque.park_name}  
                                </h1>
                                <hr />
                                <table className="text-left w-full">
                                    <tbody>
                                        <tr>
                                            <th>Abreviatura</th>
                                            <td>{parque.park_abbreviation}</td>
                                        </tr>
                                        <tr>
                                            <th>Domicilio</th>
                                            <td>{parque.park_address}</td>
                                        </tr>
                                        <tr>
                                            <th>Ciudad</th>
                                            <td>{parque.park_city}</td>
                                        </tr>    
                                        <tr>
                                            <th>Estado</th>
                                            <td>{parque.park_state}</td>
                                        </tr>
                                        <tr>
                                            <th>Codigo postal</th>
                                            <td>{parque.park_zip_code}</td>
                                        </tr>
                                        <tr>
                                            <th>Latitud</th>
                                            <td>{parque.park_latitude}</td>
                                        </tr>
                                        <tr>
                                            <th>Longitud</th>
                                            <td>{parque.park_longitude}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex flex-row gap-4">
                                <button className="bg-sky-600" onClick={()=>{handleClickRegresar()}}>Regresar</button>
                            </div>
                        </div>
                        <div className="rounded-md aspect-square">
                            <img className="imagen" src="/images/parque.png" alt={parque.park_img_uri} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Detalle;