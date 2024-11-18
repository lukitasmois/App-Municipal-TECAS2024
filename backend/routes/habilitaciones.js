const express = require("express");
const router = express.Router();
const { catchAsync } = require("../utils");
const crearNegocio = require("../controllers/habilitacion")

const {
    verHabilitacion,
    verHabilitaciones,
  } = require("../controllers/habilitacion.js");

//Busca legajos

router.get("/", catchAsync(verHabilitaciones));

//Busca legajo por id

router.get("/:legajo", catchAsync(verHabilitacion));

module.exports = router