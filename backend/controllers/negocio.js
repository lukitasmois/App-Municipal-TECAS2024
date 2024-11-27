const path = require("path");
const fs = require("fs");
const Negocio = require("../models/negocio");
const { agregarNegocio } = require("./usuario");
const { default: mongoose } = require("mongoose");

//Función para crear un nuevo negocio.
const crearNegocio = async (req, res) => {
  const idUsuario = req.body.idUsuario;
  const { calle, ciudad, altura, rubro } = req.body;

  // generar un id temporal para poder guardar el negocio
  const negocioId = new mongoose.Types.ObjectId();

  const rutasArchivos = guardarArchivos(req.files, idUsuario, negocioId);

  const negocio = new Negocio({
    _id: negocioId,
    calle,
    ciudad,
    altura,
    rubro,
    titulo: rutasArchivos.titulo,
    plano: rutasArchivos.plano,
    idUsuario,
  });

  try {
    await negocio.save();
    await agregarNegocio(idUsuario, negocio._id);
    res.json({ mensaje: "Negocio creado" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: `Error al crear el negocio: ${error.message}` });
  }
};

/**
 * Función para guardar múltiples archivos y devolver sus rutas.
 *
 * @param {Array} archivos - Lista de archivos a guardar.
 * @param {string} idUsuario - ID del usuario para crear la carpeta correspondiente.
 * @param {string} idNegocio - ID del negocio para crear la subcarpeta correspondiente.
 * @returns {Object} - Objeto con las rutas de los archivos guardados.
 */
function guardarArchivos(archivos, idUsuario, idNegocio) {
  // indices para identificar los archivos de plano y título
  const INDEX_PLANO = 0;
  const INDEX_TITULO = 1;

  // Objeto para almacenar las rutas de los archivos
  const rutasArchivos = {
    titulo: "",
    plano: "",
  };

  // Iterar sobre cada archivo y guardar su ruta
  archivos.forEach((archivo, index) => {
    let nuevoNombre;
    if (index === INDEX_PLANO) {
      nuevoNombre = `plano_${idNegocio}.pdf`;
    } else if (index === INDEX_TITULO) {
      nuevoNombre = `titulo_${idNegocio}.pdf`;
    }

    const ruta = guardarArchivo(archivo, idUsuario, idNegocio, nuevoNombre);
    if (index === INDEX_TITULO) {
      rutasArchivos.titulo = ruta;
    } else if (index === INDEX_PLANO) {
      rutasArchivos.plano = ruta;
    }
  });

  return rutasArchivos;
}

/**
 * Función para guardar un archivo en una ruta específica.
 *
 * @param {Object} archivo - Archivo a guardar.
 * @param {string} idUsuario - ID del usuario para crear la carpeta correspondiente.
 * @param {string} idNegocio - ID del negocio para crear la subcarpeta correspondiente.
 * @param {string} nuevoNombre - Nuevo nombre del archivo.
 * @returns {string} - Ruta del archivo guardado.
 */
function guardarArchivo(archivo, idUsuario, idNegocio, nuevoNombre) {
  const directorioUsuario = path.join(
    __dirname,
    "../archivos",
    idUsuario.toString()
  );

  // const rutaRespuesta = path.join("./archivos", idUsuario.toString());

  const directorioNegocio = path.join(directorioUsuario, idNegocio.toString());

  if (!fs.existsSync(directorioUsuario)) {
    fs.mkdirSync(directorioUsuario, { recursive: true });
  }
  if (!fs.existsSync(directorioNegocio)) {
    fs.mkdirSync(directorioNegocio, { recursive: true });
  }

  const rutaArchivo = path.join(directorioNegocio, nuevoNombre);
  fs.writeFileSync(rutaArchivo, archivo.buffer);

  return rutaArchivo;
}

const obtenerPlano = async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario;
    const idPlano = req.params.idPlano;
    const rutaDelArchivo = path.join(
      __dirname,
      "../archivos",
      idUsuario,
      idPlano,
      `plano_${idPlano}.pdf`
    );

    res.sendFile(rutaDelArchivo, (err) => {
      if (err) {
        res.status(404).json({ mensaje: "Plano no encontrado" });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ mensaje: "Error al intentar obtener el plano" });
  }
};

const getNegocios = async (req, res) => {
  try {
    const negocios = await Negocio.find();
    res.json(negocios);
  } catch (error) {
    console.log(error.message);
  }
};

const changeStateBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const newState = req.body.newState;
    const response = await Negocio.findByIdAndUpdate(
      id,
      { planosAprobado: newState },
      { new: true }
    );

    res.status(200).send(response);
  } catch (error) {
    console.log(error.message);
  }
};

//retorna los negocios asociados a un usuario en especifico.
const negociosPorUsuario = async (req, res) => {
  const { id } = req.params;
  // Validamos que el ID exista
  if (!id) {
    console.log("No se encontró el ID: " + id);
    return res.status(404).json({ message: "No se pudo obtener el usuario" });
  }
  try {
    // Consultamos los negocios relacionados con el usuario
    let negocios = await Negocio.find({ idUsuario: id });
    // Respondemos con los negocios encontrados
    res.json(negocios);
  } catch (err) {
    console.error("Error al obtener los negocios:", err);
    res.status(500).json({ message: "Error al obtener los negocios." });
  }
};

const agregarHabilitacion = async (id, id_habilitacion) => {
  const usuario = await Negocio.updateOne(
    { _id: id },
    { $push: { idHabilitaciones: id_habilitacion } },
    { new: true }
  );
  return usuario;
};

const verNegocios = async (req, res) => {
  try {
    const negocios = await Negocio.find();

    if (!negocios) {
      return res.status(404).json({ mensaje: "Negocios no encontrados" });
    }

    res.json(negocios);
  } catch (error) {
    console.log(`Error en el controlador VerNegocios: ${error}`);
    res.status(500).json({ mensaje: "Error al obtener los negocios" });
  }
};

const verNegocio = async (req, res) => {
  try {
    const { id } = req.params;
    const negocio = await Negocio.findById(id);

    if (!negocio) {
      return res.status(404).json({ mensaje: "Negocio no encontrado" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const negocioConUrls = {
      ...negocio.toObject(),
      titulo: `${baseUrl}/${negocio.titulo.replace(/\\/g, "/")}`,
      plano: `${baseUrl}/${negocio.plano.replace(/\\/g, "/")}`,
    };

    res.json(negocioConUrls);
  } catch (error) {
    console.log(`Error en el controlador VerNegocio: ${error}`);
    res.status(500).json({ mensaje: "Error al obtener el negocio" });
  }
};

const getBusinessById = async (id) =>{

  try {
    const bussiness= await Negocio.findById(id)
    return bussiness
  } catch (error) {
    console.log(`Error al obtener negocio: ${error}`);
  }
} 

module.exports = {
  crearNegocio,
  verNegocio,
  verNegocios,
  negociosPorUsuario,
  agregarHabilitacion,
  getNegocios,
  changeStateBusiness,
  obtenerPlano,
  getBusinessById
};

