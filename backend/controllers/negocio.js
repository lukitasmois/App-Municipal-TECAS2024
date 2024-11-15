const path = require('path');
const Negocio = require("../models/negocio")
const guardarArchivo = require("../datos/archivos")
const { agregarNegocio } = require("./usuario")



//Función para crear un nuevo negocio.
const crearNegocio = async (req, res) =>{
    const id = req.body.idUsuario
    const rutasArchivos = guardarArchivos(req.files, id)
    const { 
        calle, 
        ciudad, 
        altura, 
        rubro,
        idUsuario} = req.body

        const titulo = rutasArchivos.titulo
        const plano = rutasArchivos.plano

        const negocio = new Negocio({
            calle, 
            ciudad, 
            altura, 
            rubro, 
            titulo,
            plano, 
            idUsuario
        })

        try {
            await negocio.save()
            await agregarNegocio(id,negocio._id)
            res.json({mensaje: "Neogico creado"})
        } catch (error) {          
          res.status(500).json({ mensaje: `Error al crear el negocio`});
        }
}

/**
 * Función para guardar múltiples archivos y devolver sus rutas.
 * 
 * @param {Array} archivos - Lista de archivos a guardar.
 * @param {string} id - ID del usuario para crear la carpeta correspondiente.
 * @returns {Object} - Objeto con las rutas de los archivos guardados.
 */
function guardarArchivos(archivos, id) {
  // Índices para identificar los archivos de plano y título
    const INDEX_PLANO = 0;
    const INDEX_TITULO = 1;

    // Objeto para almacenar las rutas de los archivos
    const rutasArchivos = {
        titulo: '',
        plano: ''
      };
    
      // Iterar sobre cada archivo y guardar su ruta
      archivos.forEach((archivo, index) => {
        let nuevoNombre;
        if (index === INDEX_PLANO) {
            nuevoNombre = `plano_${id}.pdf`;
        } else if (index === INDEX_TITULO) {
            nuevoNombre = `titulo_${id}.pdf`;
        }

        const ruta = guardarArchivo(archivo, id, nuevoNombre);
        if (index === INDEX_TITULO) {
            rutasArchivos.titulo = ruta;
        } else if (index === INDEX_PLANO) {
            rutasArchivos.plano = ruta;
        }
    });

      return rutasArchivos;
}

const obteberPlano = async (req, res) =>{
    
    try {
    const id = req.params.id
    const rutaDelArchivo = path.join(__dirname, ".." , "archivos", id, `plano_${id}.pdf`);

    res.sendFile(rutaDelArchivo, (err) =>{
      if (err) {
        res.status(404).json({ mensaje: "Plano no encontrado"});
    }
    })

    } catch (error) {
      console.log(error.message);
      
        res.status(500).json({ mensaje: "Error intentar obtener el plano"});
        
    }

}


module.exports = {crearNegocio, obteberPlano}