

const authMiddleware = (req, res, next) => {
    if(!req.isAuthenticated()){
        console.log('Usuario no logeado');
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