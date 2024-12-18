const express = require("express");
const router = express.Router();
const passport = require("passport");
const fs = require("fs");
const path = require("path");
const Usuario = require("../models/usuario.js");
const {
  Habilitacion,
  Catastro,
  Planeamiento,
  Bomberos,
  ObrasPrivadas,
  IngresosPublicos,
  Admin,
} = require("../middleware/validaRol.js");
const { catchAsync } = require("../utils.js");
const {
  autenticarUsuario,
  cerrarSesion,
  verUsuarioLogeado,
  editarUsuario,
  verUsuarios,
  verUsuario,
} = require("../controllers/usuario.js");
const {
  validarEditarUsuario,
} = require("../validaciones/validarEditarUsuario.js");
const {
  authMiddleware,
  authIsHabilited,
} = require("../middleware/auth_middleware.js");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dni = req.user.nombre + req.user.apellido;
    const dir = path.join(__dirname, "../usuarios/", dni);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}${ext}`);
  },
});

const subida = multer({ storage: storage });

const subidaMultiple = subida.fields([
  { name: "frenteDNI", maxCount: 1 },
  { name: "dorsoDNI", maxCount: 1 },
  { name: "constanciaAFIP", maxCount: 1 },
]);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/autenticar",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  }),
  catchAsync(autenticarUsuario)
);

router.get("/", catchAsync(verUsuarios));

router.get("/cerrar-sesion", catchAsync(cerrarSesion));

router.get("/usuario-logeado", catchAsync(verUsuarioLogeado));

router.get("/:id", catchAsync(verUsuario));

router.put(
  "/editar/:id",
  subidaMultiple,
  validarEditarUsuario,
  catchAsync(editarUsuario)
);

router.get("/:id", catchAsync(verUsuario));

router.post("/habilitaciones", Habilitacion, (req, res) => {
  res.status(200).json("Habilitaciones");
});

module.exports = router;
