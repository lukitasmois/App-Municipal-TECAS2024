const express = require("express");
const router = express.Router();
const validarNegocio = require("../validaciones/validarNegocio");
const { catchAsync } = require("../utils");
const crearNegocio = require("../controllers/negocio")

router.post("/crearNegocio", validarNegocio, catchAsync(crearNegocio))

module.exports = router