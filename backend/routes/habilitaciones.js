const express = require("express");
const router = express.Router();
const { catchAsync } = require("../utils");
const crearNegocio = require("../controllers/habilitacion");
const {
  verHabilitacion,
  verHabilitaciones,
  verHabilitacionPorLegajo,
  crearHabilitacion,
  getNextExpire,
  verHabilitacionesxNegocio
} = require("../controllers/habilitacion.js");



router.get("/", catchAsync(verHabilitaciones));
router.get("/:id", catchAsync(verHabilitacion));
router.get("/legajo/:legajo", catchAsync(verHabilitacionPorLegajo));

router.get("/negocio/:idNegocio", catchAsync(verHabilitacionesxNegocio));

router.post("/crear", async (req, res) => {
  crearHabilitacion(req, res);
});

router.get("/:legajo", catchAsync(verHabilitacion));
router.get("/expireBussines", getNextExpire);

module.exports = router;
