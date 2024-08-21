import { Router } from "express";
const router = Router();
import UsuarioModel from "../models/usuarios.model.js";
import { createHash, isValidPassword } from "../utils/util.js";
import passport from "passport";
import jwt from "jsonwebtoken";

//Ruta para el registro
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  try {
    //se verifica si el usuario existe
    const existeUsuario = await UsuarioModel.findOne({ email: email });
    if (existeUsuario) {
      return res.status(400).send("Usuario existente");
    } //se crea el nuevo usuario
    const nuevoUsuario = new UsuarioModel({
      first_name,
      last_name,
      email,
      password: createHash(password),
      age,
    });
    //guardamos el nuevo usuario en la BD
    await nuevoUsuario.save();

    const token = jwt.sign(
      { usuario: nuevoUsuario.first_name, rol: nuevoUsuario.rol },
      "coderhouse",
      { expiresIn: "1h" }
    );
    //generacion de la cookie:
    res.cookie("coderCookieToken", token, {
      //'coderCookieToken coincide con lo indicado en cookie extractor
      maxAge: 3600000,
      httpOnly: true,
    });
    res.redirect("/api/sessions/current");
  } catch (error) {
    res.status(500).send("Error del servidor");
  }
});

//ruta login:

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuarioEncontrado = await UsuarioModel.findOne({ email: email });
    if (!usuarioEncontrado) {
      return res.status(401).send("Usuario no registrado");
    }
    //verifico el password
    if (!isValidPassword(password, usuarioEncontrado)) {
      return res.status(401).send("Password invalido");
    }
    //se genera el token de jwt
    const token = jwt.sign(
      { usuario: usuarioEncontrado.email, rol: usuarioEncontrado.rol },
      "coderhouse",
      { expiresIn: "1h" }
    );

    res.cookie("coderCookieToken", token, {
      maxAge: 3600000,
      httpOnly: true,
    });
    res.redirect("/api/sessions/current");
  } catch (error) {
    res.status(500).send("Error del servidor");
  }
});

//ruta current:
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user) {
      res.render("profile", { usuario: req.user.email });
    } else {
      res.status(401).send("Usuario no autorizado");
    }
  }
);

// ruta logout:
router.get("/logout", (req, res) => {
  res.clearCookie("coderCookieToken");
  res.redirect("/login");
});

//ruta para admins:
router.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.rol !== "admin") {
      return res.status(403).send("Acceso invalido");
    }
    res.render("admin");
  }
);

export default router;
