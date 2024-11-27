const Usuario = require("../models/usuario");

const verUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

const verUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id).populate("idNegocio");
  res.json(usuario);
};

const autenticarUsuario = async (req, res) => {
  req.login(req.user, (err) => {
    if (err) {
      console.log(err);
    }

    res.redirect("http://localhost:5173/");
  });
};

const cerrarSesion = async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ usuario: {}, logeado: false, mensaje: "Sesión cerrada" });
  });
};

const verUsuarioLogeado = async (req, res) => {
  if (req.user) {
    res.json({
      usuario: req.user,
      logeado: true,
    });
  } else {
    res.json({ mensaje: "No hay usuario logeado", logeado: false });
  }
};

const editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { email, nombre, apellido, rol, cuil, telefono, imagen, dni } =
    req.body;

  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { email, nombre, apellido, rol, cuil, telefono, imagen, dni },
    { new: true }
  );

  res.json({ mensaje: "Usuario editado correctamente", usuario });
};

const agregarNegocio = async (id, idNegocio) => {
  const usuario = await Usuario.updateOne(
    { _id: id },
    { $push: { idNegocio: idNegocio } },
    { new: true }
  );
  return usuario;
};

const modificarUsuarioHabilitado = async (req, res) => {
  const { id } = req.params;
  const { habilitado } = req.body;
  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { habilitado },
    { new: true }
  );
};

module.exports = {
  autenticarUsuario,
  cerrarSesion,
  verUsuarioLogeado,
  editarUsuario,
  verUsuarios,
  verUsuario,
  agregarNegocio,
  modificarUsuarioHabilitado,
};
