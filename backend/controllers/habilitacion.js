const Negocio = require("../controllers/negocio");
const Habilitacion = require("../models/habilitacion");
const Formulario = require("../models/formulario");
const RespuestaFormulario = require("../models/respuestaFormulario");
//metodo que permite crear una habilitación
const crearHabilitacion = async (req, res) => {
  let idNegocio = req.body.idNegocio;
  const nuevaHabilitacion = new Habilitacion({
    IdNegocio: idNegocio,
    estado: "iniciado",
  });
  if (!nuevaHabilitacion) throw new Error("No se pudo crear la habilitación");

  if (!idNegocio)
    throw new Error("No se incluyo el id del negocio en la habilitación");
  try {
    const formularios = await Formulario.find();

    if (formularios.length === 0) {
      return res.json({ mensaje: "No hay formularios registrados" });
    } else {
      for (let i = 0; i < formularios.length; i++) {
        const formulario = formularios[i];
        const respuestas = [];

        for (let j = 0; j < formulario.campos.length; j++) {
          const campo = formulario.campos[j];
          respuestas.push({ etiqueta: campo.etiqueta, valor: "" });
        }
        const nuevaRespuestaFormulario = new RespuestaFormulario({
          idFormulario: formulario._id,
          habilitacion: nuevaHabilitacion._id,
          respuestas: respuestas,
        });

        await nuevaRespuestaFormulario.save();

        nuevaHabilitacion.formularios.push(nuevaRespuestaFormulario);
      }
    }

    await nuevaHabilitacion.save();
    await Negocio.agregarHabilitacion(idNegocio, nuevaHabilitacion._id);
    res.status(201).json({
      message: "habilitacion creada exitosamente:",
      habilitacion: nuevaHabilitacion,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json("No se pudo guardar la habilitación" + req.body.idNegocio);
  }
};

const verHabilitaciones = async (req, res) => {
  const habilitaciones = await Habilitacion.find();
  res.json(habilitaciones);
};

const verHabilitacion = async (req, res) => {
  const { legajo } = req.params;
  const habilitacion = await Habilitacion.find({ NroLegajo: legajo });
  res.json(habilitacion);
};

module.exports = {
  verHabilitaciones,
  verHabilitacion,
  crearHabilitacion,
};
