const RespuestaFormulario = require("../models/respuestaFormulario");

const verRespuestaFormulario = async (req, res) => {
  const { id } = req.params;
  const respuestaFormulario = await RespuestaFormulario.findById(id).populate(
    "idFormulario"
  );

  res.json(respuestaFormulario);
};

const editarRespuestaFormulario = async (req, res) => {
  const { id } = req.params;
  const { respuestas } = req.body;
  const respuestaFormulario = await RespuestaFormulario.findByIdAndUpdate(id, {
    respuestas,
  });
  res.json(respuestaFormulario);
};

module.exports = {
  verRespuestaFormulario,
  editarRespuestaFormulario,
};
