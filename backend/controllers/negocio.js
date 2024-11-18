const Negocio = require("../models/negocio")
const guardarArchivo = require("../datos/archivos")
const { agregarNegocio } = require("./usuario")
const negocio = require("../models/negocio")
const { error, message } = require("../esquemas/esquemaNegocio")



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
          console.log(res);
          
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
//retorna los negocios asociados a un usuario en especifico.
const negociosPorUsuario = async(req, res) => {
  const { id } = req.params;
  // Validamos que el ID exista
  if (!id) {
    console.log("No se encontró el ID: " + id);
    return res.status(404).json({ message: "No se pudo obtener el usuario" });
  }
  try {
    // Consultamos los negocios relacionados con el usuario
    let negocios = await negocio.find({ idUsuario: id });
    // Respondemos con los negocios encontrados
    res.json(negocios);
  } catch (err) {
    console.error("Error al obtener los negocios:", err);
    res.status(500).json({ message: "Error al obtener los negocios." });
  }
}
const agregarHabilitacion = async(id, id_habilitacion) => {
  const usuario = await negocio.updateOne(
    {_id: id},
    {$push: {idHabilitaciones: id_habilitacion}},
    {new: true}
  )
  return usuario
}
module.exports = {crearNegocio, negociosPorUsuario, agregarHabilitacion}