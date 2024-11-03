const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NegocioSchema = new Schema({
    calle: {type: String, required: true},
    ciudad: {type: String, required: true},
    altura: {type: String, required: true},
    rubro: {type: String, required: true},
    titulo: {type: String, required: true},
    idUsuario: {type: String, required: true},
})

module.exports = mongoose.model("Negocio", NegocioSchema);