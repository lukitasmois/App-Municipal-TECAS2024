const RespuestaFormulario = require("../models/respuestaFormulario");

const verRespuestaFormulario = async (req, res) => {
  const { id } = req.params;
  try {
    const respuestaFormulario = await RespuestaFormulario.findById(id).populate(
      "idFormulario"
    );

    res.json(respuestaFormulario);
  } catch (error) {
    console.log(`Error en el controlador VerRespuestaFormulario: ${error}`);
    res
      .status(500)
      .json({ mensaje: "Error al obtener el formulario, intentelo de nuevo" });
  }
};

const editarRespuestaFormulario = async (req, res) => {
  const { id } = req.params;
  try {
    const { respuestas } = req.body;
    const respuestaFormulario = await RespuestaFormulario.findByIdAndUpdate(
      id,
      {
        respuestas,
      }
    );
    res.json(respuestaFormulario);
  } catch (error) {
    console.log(`Error en el controlador EditarRespuestaFormulario: ${error}`);
    res
      .status(500)
      .json({ mensaje: "Error al rellenar el formulario, intentelo de nuevo" });
  }
};

module.exports = {
  verRespuestaFormulario,
  editarRespuestaFormulario,
};
