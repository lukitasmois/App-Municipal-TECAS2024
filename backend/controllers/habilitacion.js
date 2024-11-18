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


module.exports = {
  verHabilitaciones,
  verHabilitacion,
  crearHabilitacion
};
