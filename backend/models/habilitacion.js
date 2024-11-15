const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const HabilitacionSchema = new Schema({
    idHabilitacion: {type: String, required: true},
    idNegocio: {type: String, required: true},
    numExpediente: {type: String, required: true},
    estado: {type: String, required: true},
    vencimiento: {type: String, required: true},
    nroLegajo: {type: Number, required: true},
    formularios: { type: [String], default: [] }
})


module.exports = mongoose.model("Habilitacion", HabilitacionSchema);