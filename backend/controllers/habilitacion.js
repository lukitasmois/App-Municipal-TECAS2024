const negocio = require("../controllers/negocio");
const habilitacion = require("../models/habilitacion");
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

const getNextExpire = async (req, res) => {
  try {
      const actual_date = new Date();
      const limit_date = new Date(actual_date);
      limit_date.setDate(actual_date.getDate() + 20);
      const habilitaciones = await habilitacion.find({
          Vencimiento: { $gte: actual_date, $lte: limit_date }
      });

      res.status(200).json(habilitaciones);
  } catch (err) {
      console.error("Error obteniendo habilitaciones próximos a vencer:", err);
      res.status(500).json({ message: "Error obteniendo habilitaciones próximos a vencer" });
  }
};

module.exports = {
  verHabilitaciones,
  verHabilitacion,
  crearHabilitacion,
  getNextExpire,
};
