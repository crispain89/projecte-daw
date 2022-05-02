/* Controladores */

/* Controlador */
const db= require("../models");
const Promocion = db.comercio;
const Op= db.Sequelize.Op;

exports.index=async( req, res)=>{
    try{
        const promociones = await Promocion.findAll();
        console.log("promociones", promociones)
        res.send(promociones);

    }catch(error){
        res.status(500).send({
            message: 
                error.message || "No hemos podido listar los promociones"
        });
    }
};
exports.store = async( req, res)=>{
    try{
        const comercio = Promocion.build(req.body);
        console.log(comercio);
        comercio.save();
        res.send(comercio);
    }catch (error) {
        console.log('error', error);
        res.status(500).send({
            message: 
                error.message || "No hemos podido  crear el comercio , revisa los datos introducidos"
        });
    }
};
exports.show=async (req, res)=>{
    try{
        const id= req.params.id;
        const comercio= await Promocion.findOne({where:{id:id}});
        res.send(comercio);
    }catch(error){
        console.log('error', error);
        res.status(500).send({
            message: 
                error.message || "No hemos podido  encontrar el comercio que has seleccionado"
        });

    }
};
exports.update = async (req, res)=>{
    try{
        const id= req.params.id;
        const comercio = await Promocion.update(req.body,{where : {id:id}
        });
        console.log("id",id)
        console.log("comercio", comercio)
        res.status(200).send("el comercio se ha actualizado correctamente")

    }catch(error){
        res.status(404).send({
            message:
              error.message || "No hemos podido encontrar el comercio que quieres modificar"
          });

    }
};
exports.destroy = async ( req, res)=>{
    try{
        const id = req.params.id;
        const comercio =await Promocion.destroy({
            where : {id:id}
        })
        console.log(comercio)
        res.status(202).send({
            message:"Se ha borrado el comercio correctament"
        })
    }catch(error){
        res.status(500).send({
            message:
                error.message || "No hemos podido encontrat el Promocion que has selecionado"
        });
        
    }
};