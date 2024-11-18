const express = require("express");
const router = express.Router();
const { crearHabilitacion } = require("../controllers/habilitacion");

router.post("/crear", async (req, res) => {
  crearHabilitacion(req, res);
});

module.exports = router;
