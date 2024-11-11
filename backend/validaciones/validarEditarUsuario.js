const esquemaEditarUsuario = require("../esquemas/esquemaEditarUsuario.js");

const validarEditarUsuario = (req, res, next) => {
    const { error } = esquemaEditarUsuario.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = {validarEditarUsuario};