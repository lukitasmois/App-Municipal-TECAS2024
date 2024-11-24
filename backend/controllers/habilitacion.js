const negocio = require("../controllers/negocio")
const Habilitacion = require("../models/habilitacion");
//metodo que permite crear una habilitación
const crearHabilitacion = async (req, res) => {
    let idNegocio = req.body.idNegocio
    console.log(idNegocio)
    const nuevaHabilitacion = new Habilitacion({
        IdNegocio: idNegocio,
        estado: "iniciado",
    })
    try{ 
        console.log(nuevaHabilitacion)
        await nuevaHabilitacion.save();
        await negocio.agregarHabilitacion(idNegocio, nuevaHabilitacion._id);
        res.status(201).json({ message: "habilitacion creada exitosamente:", habilitacion: nuevaHabilitacion });
     }
     catch(err){
        console.log(err)
        res.status(500).json("No se pudo guardar la habilitación" + req.body.idNegocio);
     }
}

const verHabilitaciones = async (req, res) => {
  const habilitaciones = await Habilitacion.find();
  res.json(habilitaciones);
};

const verHabilitacion = async (req, res) => {
  const { legajo } = req.params;
  const habilitacion = await Habilitacion.find({ NroLegajo : legajo});
  res.json(habilitacion);
};
const  verHabilitacionesxNegocio = async (req, res) => {
  const { idNegocio } = req.params;
  try {
    const habilitaciones = await Habilitacion.find({ IdNegocio : idNegocio});
    res.status(200).json(habilitaciones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las habilitaciones" });
  }
};

module.exports = {
  verHabilitaciones,
  verHabilitacion,
  crearHabilitacion,
  verHabilitacionesxNegocio
};
