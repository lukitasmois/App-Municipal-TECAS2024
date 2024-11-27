const express = require("express");
const router = express.Router();
const {
  verRespuestaFormulario,
  editarRespuestaFormulario,
} = require("../controllers/respuestaformularios");

router.get("/:id", verRespuestaFormulario);
router.put("/:id", editarRespuestaFormulario);

module.exports = router;
