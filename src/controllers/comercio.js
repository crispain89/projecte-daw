
/* Controlador */
const db= require("../models");
const Comercio = db.comercio;
const Op= db.Sequelize.Op;

exports.index=async ( req, res)=>{
    try{
        const comercios = await Comercio.findAll();
        console.log("comercios", comercios)
        res.send(comercios);

    }catch(error){
        res.status(500).send({
            message: 
                error.message || "No hemos podido listar los comercios"
        });
    }
};
exports.store = async( req, res)=>{
    try{
        const comercio = Comercio.build(req.body);
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
        const comercio= await Comercio.findOne({where:{id:id}});
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
        const comercio = await Comercio.update(req.body,{where : {id:id}
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
        const comercio =await Comercio.destroy({
            where : {id:id}
        })
        console.log(comercio)
        res.status(202).send({
            message:"Se ha borrado el comercio correctament"
        })
    }catch(error){
        res.status(500).send({
            message:
                error.message || "No hemos podido encontrat el Comercio que has selecionado"
        });
        
    }
};