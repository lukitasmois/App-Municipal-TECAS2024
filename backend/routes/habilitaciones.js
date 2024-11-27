const express = require("express");
const router = express.Router();
const { catchAsync } = require("../utils");
const crearNegocio = require("../controllers/habilitacion");

const {
  verHabilitacion,
  verHabilitaciones,
  crearHabilitacion,
  getNextExpire,
} = require("../controllers/habilitacion.js");

//Busca legajos

router.get("/", catchAsync(verHabilitaciones));

//Busca legajo por id
router.post("/crear", async (req, res) => {
  crearHabilitacion(req, res);
});

router.get("/:legajo", catchAsync(verHabilitacion));
router.get("/expireBussines", getNextExpire);
module.exports = router;
