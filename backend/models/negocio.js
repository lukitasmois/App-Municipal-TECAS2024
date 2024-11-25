const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NegocioSchema = new Schema({
    idUsuario: {type: String, required: true},
    calle: {type: String, required: true},
    ciudad: {type: String, required: true},
    altura: {type: String, required: true},
    rubro: {type: String, required: true},
    titulo: {type: String, required: true},
    plano: {type: String, required: true},
    planosAprobados: { type: Boolean, default: false }, 
    negocioAprobado: { type: Boolean, default: false }, 
    idHabilitaciones: { type: [String], default: [] }
})



module.exports = mongoose.model("Negocio", NegocioSchema);