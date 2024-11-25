const express = require("express");
const router = express.Router();
const { catchAsync } = require("../utils");
const crearNegocio = require("../controllers/habilitacion");

const {
  verHabilitacion,
  verHabilitaciones,
  crearHabilitacion,
  setLegajo,
  setExpediente
} = require("../controllers/habilitacion.js");

//Busca legajos

router.get("/", catchAsync(verHabilitaciones));

//Busca legajo por id
router.post("/crear", async (req, res) => {
  crearHabilitacion(req, res);
});

router.get("/:legajo", catchAsync(verHabilitacion));

router.post("/setlegajo", catchAsync(setLegajo));

router.post("/setexpediente", catchAsync(setExpediente));
module.exports = router;
