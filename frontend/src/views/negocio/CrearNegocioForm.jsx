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
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
            <div className="mb-3">
                <label htmlFor="calle" className="form-label">Calle</label>
                <input
                    type="text"
                    id="calle"
                    className="form-control"
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
                {errors.calle && <div className="text-danger">{errors.calle.message}</div>}
            </div>
    
            <div className="mb-3">
                <label htmlFor="altura" className="form-label">Altura</label>
                <input
                    type="number"
                    id="altura"
                    className="form-control"
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
                {errors.altura && <div className="text-danger">{errors.altura.message}</div>}
            </div>
    
            <div className="mb-3">
                <label htmlFor="ciudad" className="form-label">Ciudad</label>
                <select
                    id="ciudad"
                    className="form-select"
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
                {errors.ciudad && <div className="text-danger">{errors.ciudad.message}</div>}
            </div>
    
            <div className="mb-3">
                <label htmlFor="rubro" className="form-label">Rubro</label>
                <select id="rubro" className="form-select" {...register("rubro", {
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
                {errors.rubro && <div className="text-danger">{errors.rubro.message}</div>}
            </div>
    
            <div className="mb-3">
                <label htmlFor="titulo" className="form-label">Titulo de propiedad</label>
                <input 
                    type="file"
                    id="titulo"
                    className="form-control"
                    {...register("titulo", {
                        required:{
                            value: true,
                            message: "No se selecciono el titulo de propiedad"
                        }
                    })}
                />
                {errors.titulo && <div className="text-danger">{errors.titulo.message}</div>}
            </div>
    
            <div className="mb-3">
                <label htmlFor="plano" className="form-label">Plano de Edificacion</label>
                <input 
                    type="file"
                    id="plano"
                    className="form-control"
                    {...register("plano", {
                        required:{
                            value: true,
                            message: "No se selecciono el plano de edificacion"
                        }
                    })}
                />
                {errors.plano && <div className="text-danger">{errors.plano.message}</div>}
            </div>
    
            <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
    );
    
}

export default CrearNegocioForm