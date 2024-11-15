const Habilitacion = require("../models/habilitacion");


const verHabilitaciones = async (req, res) => {
  const habilitaciones = await Habilitacion.find();
  res.json(habilitaciones);
};

const verHabilitacion = async (req, res) => {
  const { legajo } = req.params;
  const habilitacion = await Habilitacion.find({ nroLegajo : legajo});
  res.json(habilitacion);
};


module.exports = {
  verHabilitaciones,
  verHabilitacion,
};
