const mongoose = require("mongoose");

const ROL_DEFAULT = "CONTRIBUYENTE"

const UsuarioSchema = new mongoose.Schema({
  email: { type: String },
  nombre: { type: String },
  apellido: { type: String },
  cuil: { type: String },
  telefono: { type: String },
  imagen: { type: String },
  rol: { type: String, default: ROL_DEFAULT },
  googleId: { type: String },
  idNegocio : { type: Array},
  habilitado: { type: Boolean },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
