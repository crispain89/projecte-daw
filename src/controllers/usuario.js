const {Sequelize,sequelize} = require("../models/db");
const {User} = require("../models");

const Op = Sequelize.Op;
// Create and Save a new User
// Retrieve all Usuarios from the database.
exports.inscripcion=async (req,res)=>{
  try{
    models= await User.getInscripciones(req);
    res.send(models)
  }catch(error){
    res.status(500).send({
      message:
        error.message || "No hemos podido listar los usuarios"
    });

  }
}
exports.deleteInscripciones=async (req,res)=>{
  try{
    deleted= await User.deleteInscripcionesByUser(req);
    console.log(deleted)
    res.status(200).send({message: 'Se han boorado las inscripciones del usuario'})
  }catch(error){
    res.status(500).send({
      message:
        error.message || "No hemos podido eliminar las inscripciones del usuario"
    });

  }
}
exports.promocionIs=async function(req, res){
  try{
    models= await User.getPromociones(req);
    res.send(models)
  }catch(error){
    res.status(500).send({
      message:
        error.message || "No hemos podido listar los usuarios"
    });

  }
}
exports.promociones=async(req,res)=>{
  try{
    let models;
    console.log("req",req.query)
    if(req.query.expired==='true'){
      models= await User.getPromocionesExpiredByUser(req);
      console.log("Promos",models)
      return res.status(200).send(models)
    }
    models= await User.getPromociones(req);
    res.send(models)
  }catch(error){
    res.status(500).send({
      message:
        error.message || "No hemos podido listar los usuarios"
    });

  }
}
exports.index = async (req, res) => {
  try {

    if(req.query.dni){
      const usuario=await User.findOne({where:{dni:req.query.dni}})
      return res.status(200).send(usuario)
    }
    const usuarios = await User.findAll();
    res.send(usuarios);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "No hemos podido listar los usuarios"
    });
  }
};
exports.store = async (req, res) => {
  try {
    const usuario = await User.build(req.body);
    /* probar en poner MockData.JSON */
    const usu= await usuario.save()
    console.log('usuariooooo',usu)
    res.send(usuario)
  } catch (error) {
    console.log("error",error)
    res.status(500).send({
      message:
        error.message || "No se ha podido crear el usuario, revisa los datos introducidos"
    });
  }
};
// Find a single User with an id
exports.show = async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await User.findByPk(id);
    res.send(usuario);
  } catch (error) {
    res.satus(404).send({
      message:
        error.message || "No hemos podido encontrar el usuario con el id seleccionado"
    });
  }
};
// Update a User by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    const usuarioUpdated = await user.update(req.body,{
      where : {id : id}
    });
    console.log("usuario",usuarioUpdated)
    res.status(200).send({message:"El usuario se ha actualizado correctamente"})
   /*  res.send("El usuario se ha actualizado correctamente"); */
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "No hemos podido encontrar el usuario con el id seleccionado"
    });
  }
};
// Delete a User with the specified id in the request
exports.destroy = async (req, res) => {
  const mockData = {
    nombre:"prueba2",
    apellidos:"pruebaApellido2",
    password:"prueba2",
  }
  try {
    const id = req.params.id;
    const usuario = await User.destroy({
      where : {id : id}
    });
    res.status(200).send({
      message: "El usuario se ha eliminado correctamente"
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "No hemos podido encontrar el usuario con el id seleccionado"
    });
  }
};