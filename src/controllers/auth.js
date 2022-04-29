const db = require("../models");
const config = require("../config/auth");
const smtpTransport = require("../config/mail")
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const User = db.usuario;
const Token = db.token;
const Rol = db.rol;
const Op = db.Sequelize.Op;

async function generateToken(usuario){
  // generate token and save
  var token = await Token.create({ token: crypto.randomBytes(16).toString('hex'), usuario_id: usuario.id, fecha_expiracion: Date.now() + 3600});
  console.log(token)
  if (!token){
    throw new Error("El token no se pudo crear correctamente...")
  }
  return token
}

function sendVerificationMail(req,usuario){
  // Send email (use credintials of SendGrid)
  let tokenObject = generateToken(usuario)
  var mailOptions = { 
    from: 'macape@fp.insjoaquimmir.cat', 
    to: usuario.email, 
    subject: 'Account Verification Link',
    text: 'Hello '+ req.body.nombre +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + usuario.email + '\/' + tokenObject.token + '\n\nThank You!\n' 
  };
  smtpTransport.sendMail(mailOptions, function (err) {
    if (err) { 
      throw new Error(err)
      //return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
    }
    //return res.status(200).send('A verification email has been sent to ' + usuario.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
  });
}

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
    const passwordIsValid = req.body.contraseña===req.body.rep_contraseña
    if( !passwordIsValid ){
      throw new Error("Passwords are not the same")
    }
    const usuario = await User.create({
        nombre: req.body.nombre,
        email: req.body.email,
        contraseña: bcrypt.hashSync(req.body.contraseña, 8),
        avatar_id: 1,
        rol_id: rol,
        token_activado:0
    });
    sendVerificationMail(req,usuario)
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
    if (!usuario.token_activado){
      return res.status(401).send({message:'Your Email has not been verified. Please click on resend'});
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