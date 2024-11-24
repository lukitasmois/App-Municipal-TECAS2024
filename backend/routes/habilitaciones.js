const express = require("express");
const router = express.Router();
const { catchAsync } = require("../utils");
const crearNegocio = require("../controllers/habilitacion");
const {
  verHabilitacion,
  verHabilitaciones,
  crearHabilitacion,
  verHabilitacionesxNegocio
} = require("../controllers/habilitacion.js");



router.get("/", catchAsync(verHabilitaciones));

router.get("/negocio/:idNegocio", catchAsync(verHabilitacionesxNegocio));

router.post("/crear", async (req, res) => {
  crearHabilitacion(req, res);
});

router.get("/:legajo", catchAsync(verHabilitacion));

module.exports = router;
