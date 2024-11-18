const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HabilitacionSchema = new Schema({
    num_expediente: { type: String, required: false },
    IdNegocio: { type: String, required: true },
    estado: { type: String, required: true },
    Vencimiento: { type: Date, default: null },
    NroLegajo: { type: String, required: false },
    Formularios: { type: [String], default:[] },
})

module.exports = mongoose.model("Habilitacion", HabilitacionSchema);