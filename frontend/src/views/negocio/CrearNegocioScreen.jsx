import CrearNegocioForm from "./CrearNegocioForm"

function CrearNegocio({ usuarioLogeado }) {
    
    return(
        <>
            <CrearNegocioForm usuarioLogeado= {usuarioLogeado}/>
        </>
        
    )
}

export default CrearNegocio