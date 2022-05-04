/* Controladores */

/* Controlador */
const db= require("../models");
const { selectByFk } = require("./helpers");
const Promocion = db.promocion;
const Op= db.Sequelize.Op;

exports.index=async( req, res)=>{
    selectByFk(req,res,Promocion,"comercio_id")
};
exports.index=async( req, res)=>{
    selectByFk(req,res,Promocion,"comercio_id")
};

exports.store = async( req, res)=>{
    try{
        const promocion = await Promocion.build({...req.body, comercio_id:req.params.id});
        console.log(promocion);
        promocion.save();
        res.send(promocion);
    }catch (error) {
        console.log('error', error);
        res.status(500).send({
            message: 
                error.message || "No hemos podido  crear el promocion , revisa los datos introducidos"
        });
    }
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
    try{
        const {id, nid}= req.params;
        const promocion = await Promocion.update(req.body,{where : {id:id, comercio_id:nid}
        });
        console.log("id",id)
        console.log("promocion", promocion)
        res.status(200).send("el promocion se ha actualizado correctamente")

    }catch(error){
        res.status(404).send({
            message:
              error.message || "No hemos podido encontrar el promocion que quieres modificar"
          });

    }
};
exports.destroy = async ( req, res)=>{
    try{
        const {id, nid}= req.params;
        const promocion =await Promocion.destroy({
            where : {id:id, comercio_id:nid}
        })
        console.log(promocion)
        res.status(202).send({
            message:"Se ha borrado el promocion correctament"
        })
    }catch(error){
        res.status(500).send({
            message:
                error.message || "No hemos podido encontrat el Promocion que has selecionado"
        });
        
    }
};