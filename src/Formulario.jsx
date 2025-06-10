import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Formulario(){
    //Estado para almacenar los datos del formulario, se inicializa con los atributos esperados
    const [form, setForm] = useState({
        park_name: '',
        park_abbreviation: '',
        park_img_url: '',
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

    //Declaración de la variable para navegar entre rutas
    const navigate = useNavigate()

    //Función para manejar el evento de cambio en los input del formulario
    //Almacena la información al estado
    const handleChange = (e) => {
        setForm({
            ...form, //se agrega la información ya guardada en el estado
            [e.target.name]: e.target.value //se agrega el valor del input
        });
    };

    //Función para navegar a la pagina principal
    const handleClickRegresar = () =>{
        navigate('/')
    }

    //Función para limpiar el formulario y el estado
    const limpiarFormulario = () => {
        setForm({
            park_name: '',
            park_abbreviation: '',
            park_img_url: '',
            park_address: '',
            park_city: '',
            park_state: '',
            park_zip_code: '',
            park_latitude: '',
            park_longitude: ''
        })
    }

    //Función para crear un nuevo parque
    const handleClickCrear = () => {
        //Validación de los campos vacios
        if (
            form.park_name === '' ||
            form.park_abbreviation === '' ||
            form.park_img_url === '' ||
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
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': auth,
                'Ambu-Private-Key': authAmbu
            },
            body: JSON.stringify(form) //se envía el estado en formato JSON
        })
        .then(response => {
            if (response.ok) {
                alert("El parque se ha creado correctamente");
                limpiarFormulario();
                navigate('/')
            } else {
                alert("Error al crear el parque");
            }
        })
        .catch(error => console.error(error));
    }


    return (
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
                            <input type="text" id="park_img_url" name="park_img_url" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={form.park_img_url} onChange={handleChange}/>
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
                        <button type="button"  className="bg-emerald-800 m-2 w-full" onClick={()=>{handleClickCrear()}}>Enviar</button>
                    </form>
                    <div className="flex flex-row gap-4 flex-wrap justify-center" >
                        <button className="bg-sky-600 m-2" onClick={()=>{handleClickRegresar()}}>Regresar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Formulario;