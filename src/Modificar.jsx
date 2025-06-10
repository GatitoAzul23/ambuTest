import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Modificar(){
    
    //Estado para almacenar los datos del formulario y enviarlos mismo a la peticion PUT
    const [form, setForm] = useState({
        park_name: '',
        park_abbreviation: '',
        park_img_uri: '',
        park_address: '',
        park_city: '',
        park_state: '',
        park_zip_code: '',
        park_latitude: '',
        park_longitude: ''
    })

    //Variables de entorno
    const url = import.meta.env.VITE_API_URL
    const auth = import.meta.env.VITE_AUTHORIZATION;
    const authAmbu = import.meta.env.VITE_AMBU_API_KEY;

    //Declaración de la variable para navegar en las rutas
    const navigate = useNavigate()

    //Hook para obtener el id de la URL
    const {id} = useParams();

    //Hook para realizar la petición del parque según el id cuando se renderiza por primera vez
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
            console.log(data),
        setForm(data.data)})
        .catch(error=> console.error(error))
    }, [id])

    //Función para manejar el evento de cambio en los input del formulario
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    //Función para modificar los datos del parque
    const handleClickModificar = () => {
        //Se realiza la validación de los campos vacios
        if (
            form.park_name === '' ||
            form.park_abbreviation === '' ||
            form.park_img_uri === '' ||
            form.park_address === '' ||
            form.park_city === '' ||
            form.park_state === '' ||
            form.park_zip_code === '' ||
            form.park_latitude === '' ||
            form.park_longitude === ''
        ) {
            alert('Por favor completa todos los campos');
            return;
        } 
        //Se añade los datos ya guardados en el estado
        //Como la propiedad que guarda la imagen cambia de nombre al enviar información se le pasa el valor de la propiedad en la consulta
        const datosEnvio = {
            ...form,
            park_img_url: form.park_img_uri
        }
        fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': auth,
                'Ambu-Private-Key': authAmbu
            },
            body: JSON.stringify(datosEnvio)
        })
        .then(response => {
            if (response.ok) {
                alert("El parque se ha modificado correctamente");
                //limpiarFormulario();
                navigate('/')
            } else {
                alert("Error al modificar el parque");
            }
        })
        .catch(error => console.error(error));
    }
    //Función para navegar a la pagina principal
    const handleClickRegresar = ()=> {
        navigate('/')
    }

    return(
        <>
            <div className="w-full grid grid-cols-1 gap-8 items-center lg:grid-cols-1">
                <h1 className="mb-3">Registrar parque</h1>
                <div className="container mx-auto items-center border b-emerald-800 border-2 rounded-lg p-4">
                    <form className="text-left w-full justify-center">
                        <div className="my-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >Nombre del parque</label>
                            <input type="text" id="park_name" name="park_name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  value={form.park_name} onChange={handleChange}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >Abreviación</label>
                            <input type="text" id="park_abbreviation" name="park_abbreviation" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={form.park_abbreviation} onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >Imagen</label>
                            <input type="text" id="park_img_uri" name="park_img_uri" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={form.park_img_uri} onChange={handleChange}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Domicilio</label>
                            <input type="text" id="park_address" name="park_address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={form.park_address} onChange={handleChange}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Ciudad</label>
                            <input type="text" id="park_city" name="park_city" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={form.park_city} onChange={handleChange}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                            <input type="text" id="park_state" name="park_state" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={form.park_state} onChange={handleChange}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Código postal</label>
                            <input type="text" id="park_zip_code" name="park_zip_code" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={form.park_zip_code} onChange={handleChange}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Latitud</label>
                            <input type="text" id="park_latitude" name="park_latitude" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={form.park_latitude} onChange={handleChange}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Longitud</label>
                            <input type="text" id="park_longitude" name="park_longitude" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={form.park_longitude} onChange={handleChange}/>
                        </div>
                        <button type="button"  className="bg-emerald-800 m-2 w-full" onClick={()=>{handleClickModificar()}}>Enviar</button>
                    </form>
                    <div className="flex flex-row gap-4 flex-wrap justify-center" >
                        <button className="bg-sky-600 m-2" onClick={()=>{handleClickRegresar()}}>Regresar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modificar;