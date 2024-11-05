import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



const CIUDADES =["Azul" , "Chillar", "Cachari", "Dieciseis de Julio", "Ariel"]
const RUBROS = ["Local Comestible", "Boliche"]

function CrearNegocioForm({usuarioLogeado}) {    
    console.log(usuarioLogeado);
    
    
    const navigate = useNavigate()

    const {register, 
        handleSubmit, 
        formState : {errors}
    } = useForm()

    const onSubmit = async (datos) =>{

        const formData = new FormData();
        formData.append("idUsuario", usuarioLogeado.usuario._id)
        formData.append("calle", datos.calle);
        formData.append("altura", datos.altura);
        formData.append("ciudad", datos.ciudad);
        formData.append("rubro", datos.rubro);
        formData.append("archivos", datos.titulo[0]);
        formData.append("archivos", datos.plano[0]);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/negocios/crearNegocio`, formData)
            console.log(response);
            
            if(response.status == 200){
                toast.success("Se creó el negocio con éxito.");
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
        } catch (error) {
            toast.error("Error al crear el negocio.")
            console.error('error al enviar los datos: ', error);
        }
    }

return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="form-group">
            <label htmlFor="calle">Calle</label>
            <input
                type="text"
                id="calle"
                {...register("calle", {
                    required: {
                        value: true,
                        message: "La calle es requerida"
                    },
                    validate: value => {
                        const num = parseFloat(value);
                        if (!isNaN(num) && num < 1) {
                            return "No es una calle valida";
                        }
                        return true;
                    }
                })}
            />
            {errors.calle && <span className="text-red-500">{errors.calle.message}</span>}
        </div>

        <div className="form-group">
            <label htmlFor="altura">Altura</label>
            <input
                type="number"
                id="altura"
                {...register("altura", {
                    required: {
                        value: true,
                        message: "La altura es requerida"
                    },
                    min: {
                        value: 1,
                        message: "No es una altura valida"
                    }
                })}
            />
            {errors.altura && <span className="text-red-500">{errors.altura.message}</span>}
        </div>

        <div className="form-group">
            <label htmlFor="ciudad">Ciudad</label>
            <select
                id="ciudad"
                {...register("ciudad", {
                    required: {
                        value: true,
                        message: "La ciudad es requerida"
                    },
                    validate: value => value !== "" || "La ciudad es requerida"
                })}
            >
                <option value="">Seleccione una ciudad</option>
                {CIUDADES.map((ciudad, index) => (
                    <option key={index} value={ciudad}>{ciudad}</option>
                ))}
            </select>
            {errors.ciudad && <span className="text-red-500">{errors.ciudad.message}</span>}
        </div>

        <div className="form-group">
            <label htmlFor="rubro">Rubro</label>
            <select id="rubro" {...register("rubro", {
                required: {
                    value: true,
                    message: "El rubro es requerido"
                }
            })}>
                <option value="">Seleccione un rubro</option>
                {RUBROS.map((rubro, index) => (
                    <option key={index} value={rubro}>{rubro}</option>
                ))}
            </select>
            {errors.rubro && <span className="text-red-500">{errors.rubro.message}</span>}
        </div>

        <div className="form-group">
        <label>Titulo de propiedad</label>
        <input 
            type="file"
            {...register("titulo", {
                required:{
                    value: true,
                    message: "No se selecciono el titulo de propiedad"
                }
            })}
        />
        {errors.titulo && <span>{errors.titulo.message}</span>}
        </div>

        <div className="form-group">
        <label>Plano de Edificacion</label>
        <input 
            type="file"
            {...register("plano", {
                required:{
                    value: true,
                    message: "No se selecciono el plano de edificacion"
                }
            })}
        />
        {errors.plano && <span>{errors.plano.message}</span>}
        </div>
        <button type="submit">Enviar</button>
    </form>
);
    
}

export default CrearNegocioForm