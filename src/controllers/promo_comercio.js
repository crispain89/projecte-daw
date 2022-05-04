/* Controladores */

/* Controlador */
const db= require("../models");
const { selectByFk, createByFk, deleteByFk, updateByFk }= require("./helpers");
const Promocion = db.promocion;
const Op= db.Sequelize.Op;

exports.index=async( req, res)=>{
    selectByFk(req,res,Promocion,"comercio_id")
};

exports.store = ( req, res)=>{
        /* const promocion = await Promocion.build({...req.body, comercio_id:req.params.id}); */
        createByFk(req,res,Promocion,"comercio_id");
};
exports.show=async (req, res)=>{
    try{
        const id= req.params.id;
        const promocione= await Promocion.findAll({where:{id:id}});
        res.send(promocione);
    }catch(error){
        console.log('error', error);
        res.status(500).send({
            message: 
                error.message || "No hemos podido  encontrar el promocion que has seleccionado"
        });

    }
};
exports.update = async (req, res)=>{
    updateByFk(req, res,Promocion,'id','comercio_id')
};
exports.destroy = async ( req, res)=>{
    deleteByFk(req,res,Promocion,'id','comercio_id');
   
};