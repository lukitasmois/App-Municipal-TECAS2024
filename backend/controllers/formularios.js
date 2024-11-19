const Formulario = require("../models/formulario");

const verFormulario = async (req, res) => {
  const { id } = req.params;
  const formulario = await Formulario.findById(id);
  res.json(formulario);
};

//Debajo estan los controladores para crear o editar los formularios directamente en la base de datos
//Pero ya se estan creando automaticamente con los JSON de la carpeta json-formularios

// const crearFormulario = async (req, res) => {
//   const { campos, nombre } = req.body;
//   const nuevoFormulario = new Formulario({
//     campos,
//     nombre,
//   });
//   await nuevoFormulario.save();
//   res.json({ nuevoFormulario });
// };

// const editarFormulario = async (req, res) => {
//   const { id } = req.params;
//   const { campos } = req.body;
//   const formulario = await Formulario.findByIdAndUpdate(id, {
//     campos,
//   });
//   res.json({ formulario });
// };

module.exports = { verFormulario /* crearFormulario, editarFormulario */ };
