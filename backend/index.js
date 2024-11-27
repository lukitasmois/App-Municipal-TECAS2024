const express = require("express");
const mongoose = require("mongoose");
const app = express();
const puerto = 3000;
const session = require("express-session");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const Usuario = require("./models/usuario.js");
const { generarFormularios } = require("./utils");

require("dotenv").config();
const cron = require("node-cron")
const { verifyAuthorizationExpiration } = require("./controllers/habilitacion.js");

const path = require("path");
const { nextToExpire }= require("./cronJobs/cronJobs.js");
app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DB
mongoose.connect("mongodb://127.0.0.1:27017/habilitaciones-municipalidad");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Conectado a la base de datos");
});
//DB

//cors (esto acepta peticiones de todos los origenes, cambiarlo mas tarde)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept, Origin, Authorization"
  );
  next();
});
//cors

//session
app.use(
  session({
    secret: "aaaa",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true },
  })
);
//session

//passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      const usuario = await Usuario.findOne({ googleId: profile.id });

      if (usuario) {
        console.log("Usuario encontrado en la base de datos");

        // console.log(usuario);

        return done(null, usuario);
      } else {
        const nuevoUsuario = new Usuario({
          nombre: profile.name.givenName,
          apellido: profile.name.familyName,
          email: profile.emails[0].value,
          imagen: profile.photos[0].value,
          googleId: profile.id,
        });
        await nuevoUsuario.save();
        done(null, nuevoUsuario);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  const usuario = Usuario.findById(user._id);
  console.log(user);

  done(null, user);
});
//passport

//Generar los esqueletos de los formularios en la base de datos a partir de los JSON que estan en la carpeta formularios-JSON
generarFormularios();

//Rutas

app.use("static", express.static(path.join(__dirname, "public")));
const archivosDir = path.join(__dirname, "archivos");
app.use("/archivos", express.static(archivosDir));

const usuariosRouter = require("./routes/usuario.js");
const negociosRouter = require("./routes/negocio.js")
const habilitacionesRouter = require("./routes/habilitaciones.js")
const emailsRouter = require("./routes/emails.js");


app.use("/api/emails", emailsRouter)
const formulariosRouter = require("./routes/formularios.js");
const respuestaFormulariosRouter = require("./routes/respuestaformularios.js");

app.use("/api/usuarios", usuariosRouter);
app.use("/api/negocios", negociosRouter);
app.use("/api/habilitaciones", habilitacionesRouter);
app.use("/api/formularios", formulariosRouter);
app.use("/api/respuestaformularios", respuestaFormulariosRouter);


//Rutas
//cron jobs
cron.schedule('* * * * *', () => {
  nextToExpire();
});
//cron jobs


//Rutas
app.listen(puerto, () => {
  console.log(`Backend API en puerto ${puerto}`);
});

//node-cron
cron.schedule('0 0 * * *', () => {
  console.log('Ejecutando tarea de verificación de habilitaciones vencidas');
  verifyAuthorizationExpiration()
});