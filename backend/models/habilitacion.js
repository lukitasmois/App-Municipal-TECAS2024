const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HabilitacionSchema = new Schema({
  num_expediente: { type: String, required: false },
  IdNegocio: { type: Schema.Types.ObjectId, ref: "Negocio" },
  estado: { type: String, required: true },
  Vencimiento: { type: Date, default: null },
  NroLegajo: { type: String, required: false },
  formularios: [{ type: Schema.Types.ObjectId, ref: "RespuestaFormulario" }],
});

module.exports = mongoose.model("Habilitacion", HabilitacionSchema);
