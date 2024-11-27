// const Formulario = require("../models/Formulario");
const { catchAsync } = require("../utils");
const { verFormulario } = require("../controllers/formularios");
const router = require("express").Router();

router.get("/:id", catchAsync(verFormulario));
// router.post("/", catchAsync(crearFormulario));
// router.put("/:id", catchAsync(editarFormulario));

module.exports = router;
