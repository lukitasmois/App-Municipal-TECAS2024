const express = require("express");
const router = express.Router();
const { catchAsync } = require("../utils");
const crearNegocio = require("../controllers/habilitacion");

const {
  verHabilitacion,
  verHabilitaciones,
  verHabilitacionPorLegajo,
  crearHabilitacion,
} = require("../controllers/habilitacion.js");

//Busca legajos

router.get("/", catchAsync(verHabilitaciones));
router.get("/:id", catchAsync(verHabilitacion));
router.get("/legajo/:legajo", catchAsync(verHabilitacionPorLegajo));

//Busca legajo por id
router.post("/crear", async (req, res) => {
  crearHabilitacion(req, res);
});

module.exports = router;
