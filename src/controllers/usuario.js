const db = require("../models");
const Usuario = db.usuario;
const Op = db.Sequelize.Op;
// Create and Save a new Usuario
// Retrieve all Usuarios from the database.
exports.index = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.send(usuarios);
  } catch (error) {
    res.sendStatus(500).send({
      message:
        error.message || "No hemos podido listar los usuarios"
    });
  }
};
exports.store = async (req, res) => {
  try {
    const usuario = Usuario.build(req.body);
    /* probar en poner MockData.JSON */
    usuario.save();
    res.send(usuario)
  } catch (error) {
    console.log("error",error)
    res.sendStatus(500).send({
      message:
        error.message || "No se ha podido crear el usuario, revisa los datos introducidos"
    });
  }
};
// Find a single Usuario with an id
exports.show = async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await Usuario.findByPk(id);
    res.send(usuario);
  } catch (error) {
    res.sendStatus(404).send({
      message:
        error.message || "No hemos podido encontrar el usuario con el id seleccionado"
    });
  }
};
// Update a Usuario by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await Usuario.update(req.body,{
      where : {id : id}
    });
    console.log("usuario",usuario)
    res.send("El usuario se ha actualizado correctamente");
  } catch (error) {
    res.sendStatus(500).send({
      message:
        error.message || "No hemos podido encontrar el usuario con el id seleccionado"
    });
  }
};
// Delete a Usuario with the specified id in the request
exports.destroy = async (req, res) => {
  const mockData = {
    nombre:"prueba2",
    apellidos:"pruebaApellido2",
    contraseña:"prueba2",
  }
  try {
    const id = req.params.id;
    const usuario = await Usuario.destroy({
      where : {id : id}
    });
    res.send("El usuario se ha eliminado correctamente");
  } catch (error) {
    res.sendStatus(500).send({
      message:
        error.message || "No hemos podido encontrar el usuario con el id seleccionado"
    });
  }
};