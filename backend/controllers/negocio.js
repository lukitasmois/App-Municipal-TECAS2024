const Negocio = require("../models/negocio")
const guardarArchivo = require("../datos/archivos")



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
        const ruta = guardarArchivo(archivo, id);
        if (index === INDEX_TITULO) {
          rutasArchivos.titulo = ruta;
        } else if (index === INDEX_PLANO) {
          rutasArchivos.plano = ruta;
        }
      });

      return rutasArchivos;
}


module.exports = crearNegocio