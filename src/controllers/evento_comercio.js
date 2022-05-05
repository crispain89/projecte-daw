/* Controladores */

/* Controlador */
const {Sequelize,sequelize} = require("../models/db");
const {User,Token, Rol} = require("../models");
const { selectByFk, createByFk, deleteByFk, updateByFk ,getIdByFk}= require("./helpers");
const Op= Sequelize.Op;

exports.index=async( req, res)=>{
    selectByFk(req,res,Evento,"comercio_id")
};

exports.store = ( req, res)=>{
        /* const evento = await Evento.build({...req.body, comercio_id:req.params.id}); */
        createByFk(req,res,Evento,"comercio_id");
};
exports.show=async (req, res)=>{
  getIdByFk(req,res,Evento,'comercio_id','id')
};
exports.update = async (req, res)=>{
    updateByFk(req, res,Evento,'comercio_id', 'id')
};
exports.destroy = async ( req, res)=>{
    deleteByFk(req,res,Evento,'comercio_id','id');
   
};