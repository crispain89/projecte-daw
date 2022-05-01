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
  console.log("token",token.token)
  if (!token){
    throw new Error("El token no se pudo crear correctamente...")
  }
  return token
}

async function sendVerificationMail(req,res,usuario,token){
  // Send email (use credintials of SendGrid)
  if ( !usuario ) throw new Error("QUe usuario ni que usuario")
  var mailOptions = { 
    from: 'macape@fp.insjoaquimmir.cat', 
    to: usuario.email, 
    subject: 'Account Verification Link',
    text: 'Hello '+ usuario.nombre +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + usuario.email + '\/' + token.token + '\n\nThank You!\n' 
  };
  smtpTransport.sendMail(mailOptions, function (err) {
    if (err) { 
      throw new Error(err)
      //return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
    }
    return res.status(200).send('A verification email has been sent to ' + usuario.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
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
    let tokenObject = await generateToken(usuario)
    await sendVerificationMail(req,usuario,tokenObject)
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
exports.confirmEmail = async (req, res) => {
    const token = await Token.findOne({ where: { token: req.params.token } })
    // token is not found into database i.e. token may have expired 
    if (!token) {
        return res.status(400).send({ msg: 'Your verification link may have expired. Please click on resend for verify your Email.' });
    }
    // if token is found then check valid user 
    else {
        const user = await User.findByPk(token.usuario_id)
        // not valid user
        console.log("USER ",user)
        if (!user) {
            return res.status(401).send({ msg: 'We were unable to find a user for this verification. Please SignUp!' });
        }
        // user is already verified
        else if (user.token_activado) {
            return res.status(200).send('User has been already verified. Please Login');
        }
        // verify user
        else {
            // change isVerified to true
            // destroy verification token ?
            try{
                //await token.destroy()
                await user.update( 
                    {token_activado:1}
                )
                return res.status(200).send('Your account has been successfully verified');
            }
            catch(e){
                return res.status(500).send({ message: e.message });
            }
        }
    }
}

exports.resendLink = async (req, res, next) => {
    const user = await User.findOne({where: {email: req.params.email }})
    // user is not found into database
    if (!user){
        return res.status(400).send({msg:'We were unable to find a user with that email. Make sure your Email is correct!'});
    }
    // user has been already verified
    else if (user.token_activado){
        return res.status(200).send('This account has been already verified. Please log in.');
    } 
    // send verification link
    // generate token and save
    try{
        // Send email (use credintials of SendGrid)
        let tokenObject = await generateToken(user)
        await sendVerificationMail(req,res,user,tokenObject)
    }
    catch(e){
        return res.status(500).send({msg:e.message});
    }
}