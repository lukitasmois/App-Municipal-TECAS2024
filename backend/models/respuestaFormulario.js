const mongoose = require("mongoose");
const { Schema } = require("mongoose");

/* Esquema para el historial de ediciones, NO IMPLEMENTADO */
const historialEdicionSchema = new Schema({
  fechaEdicion: { type: Date, default: Date.now },
  cambios: Schema.Types.Mixed, //Falta ver como implementar el registro de cambios
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario" },
});
/* Esquema para el historial de ediciones, NO IMPLEMENTADO */

const respuestaCampoSchema = new Schema({
  etiqueta: { type: String, required: true },
  valor: Schema.Types.Mixed, // Puede ser cualquier tipo de dato
});

// Esquema para las respuestas del formulario
const respuestaFormularioSchema = new Schema({
  idFormulario: {
    type: Schema.Types.ObjectId,
    ref: "Formulario",
    required: true,
  },
  respuestas: [respuestaCampoSchema],
  area: {
    type: String,
    enum: ["HABILITACIONES", "OBRAS PRIVADAS", "INGRESOS PUBLICOS", "TODOS"], //Falta agregar todos las areas/roles
  },
  expediente: { type: Schema.Types.ObjectId, ref: "Expediente" },
  estado: {
    type: String,
    default: "pendiente",
    enum: ["pendiente", "aprobado", "rechazado"],
  },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "RespuestaFormulario",
  respuestaFormularioSchema
);
