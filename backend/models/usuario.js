const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  email: { type: String },
  nombre: { type: String },
  apellido: { type: String },
  cuil: { type: String },
  telefono: { type: String },
  imagen: { type: String },
  rol: { type: String },
  googleId: { type: String },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
