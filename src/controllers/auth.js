const db = require("../models");
const config = require("../config/auth");
const User = db.usuario;
const Rol = db.rol;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.signup = async (req, res) => {
  // Save User to Database
  try {
    let rol;
    if (req.body.rol) {
        rol = await Rol.findOne({
        where: {
            nombre: {
            [Op.eq]: req.body.rol,
            },
        },
        });
        rol = req.body.rol
    } else {
        // usuario has rol = 1
        rol = 1;
    }
    const usuario = await User.create({
        nombre: req.body.nombre,
        email: req.body.email,
        contraseña: bcrypt.hashSync(req.body.contraseña, 8),
        avatar_id: 1,
        rol_id: rol
    });
    console.log("USUARIO",usuario)
    if (usuario) res.send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.signin = async (req, res) => {
  try {
    const usuario = await User.findOne({
      where: {
        nombre: req.body.nombre,
      },
    });
    if (!usuario) {
      return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.contraseña,
      usuario.contraseña
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }
    const token = jwt.sign({ id: usuario.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    /*let authorities = [];
    const roles = await usuario.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    } */
    req.session.token = token;
    return res.status(200).send({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      //roles: authorities,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};