/* Controlador */
const {Sequelize,sequelize} = require("../models/db");
const {Evento} = require("../models");
const Op= Sequelize.Op;


exports.getEventoActive= async (req, res)=>{
    

    try{
        const eventos= await Evento.getEventosCurrent();
        console.log("EVENTOS NO CADUCADOS",eventos);
        res.status(200).send(eventos)

    }catch(e){
        res.status(500).send({
            message:
                e.message || "No hemos podido listar los eventos"
        });

    }
}
exports.index=async ( req, res)=>{
    console.log("query",req.query)
    
    try{
        if(req.query.active===true){
            const eventos= await Evento.getEventosCurrent();
            console.log("EVENTOS NO CADUCADOS",eventos);
            return res.status(200).send(eventos)
        }
        const eventos = await Evento.findAll();
        console.log("eventos", eventos)
        res.send(eventos);

    }catch(error){
        res.status(500).send({
            message: 
                error.message || "No hemos podido listar los eventos"
        });
    }
};
exports.store = async( req, res)=>{
    console.log("ENTRAAA")

    try{
        const evento = Evento.build(req.body);
        evento.save();
        res.send(evento);
    }catch (error) {
        console.log('error', error);
        res.status(500).send({
            message: 
                error.message || "No hemos podido  crear el evento , revisa los datos introducidos"
        });
    }
};
exports.show=async (req, res)=>{
    console.log("ENTRAAA")

    try{
        const id= req.params.id;
        const evento= await Evento.findOne({where:{id:id}});
        res.send(evento);
    }catch(error){
        console.log('error', error);
        res.status(500).send({
            message: 
                error.message || "No hemos podido  encontrar el evento que has seleccionado"
        });

    }
};
exports.update = async (req, res)=>{
    try{
        const id= req.params.id;
        const evento = await Evento.update(req.body,{where : {id:id}
        });
        console.log("id",id)
        console.log("evento", evento)
        res.status(200).send("el evento se ha actualizado correctamente")

    }catch(error){
        res.status(404).send({
            message:
              error.message || "No hemos podido encontrar el evento que quieres modificar"
          });

    }
};
exports.destroy = async ( req, res)=>{
    try{
        const id = req.params.id;
        const evento =await Evento.destroy({
            where : {id:id}
        })
        console.log(evento)
        res.status(202).send({
            message:"Se ha borrado el evento correctament"
        })
    }catch(error){
        res.status(500).send({
            message:
                error.message || "No hemos podido encontrat el Evento que has selecionado"
        });
        
    }
};