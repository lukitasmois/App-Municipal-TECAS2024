const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const campoSchema = new Schema({
  tipo: { type: String, required: true }, // text, checkbox, select, etc.
  etiqueta: { type: String, required: true },
  requerido: { type: Boolean, default: false },
  opciones: [String], // Solo para campos tipo select o radio
  valor: Schema.Types.Mixed, // Puede ser cualquier tipo de dato
});

const formularioSchema = new Schema({
  nombreFormulario: { type: String, required: true },
  campos: [campoSchema],
});

module.exports = mongoose.model("Formulario", formularioSchema);
