const mongoose = require("mongoose");
const { type } = require("../esquemas/esquemaEditarUsuario");
const { ref, object } = require("joi");

const ROL = "ROL";

const ROL_DEFAULT = "CONTRIBUYENTE";

const UsuarioSchema = new mongoose.Schema({
  email: { type: String },
  nombre: { type: String },
  apellido: { type: String },
  dni: { type: String },
  cuil: { type: String },
  telefono: { type: String },
  imagen: { type: String },
  rol: { type: String, default: ROL_DEFAULT },
  googleId: { type: String },
  idNegocio: [{ type: mongoose.Schema.Types.ObjectId, ref: "Negocio" }],
  habilitado: { type: Boolean },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
