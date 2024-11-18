

const authMiddleware = (req, res, next) => {
    console.log('Usuario no logeado');
    console.log("user: ", req.user);
    console.log("usuario: ", req.usuario);
    console.log("user aut: ", req.isAuthenticated());
    if(!req.isAuthenticated()){

        
        return res.status(401).json({ error: "User not authenticated" });
    };
    console.log("usuario logeado:"+ req.params._id)
    next();
};
const authIsHabilited = (req, res, next) => {
    if(!req && !req.user.habilitado){
        console.log('Usuario no habilitado');
        return res.status(403).json({error:"User not authorized"});
    };
    console.log("usuario habilitado:"+ req.params._id)
    next();
}

module.exports = { authMiddleware, authIsHabilited };