const {Sequelize,sequelize}=require('../models/db');
const{Usu_comercio}=require('../models');
const Op=Sequelize.Op;

exports.store = async (req, res) => {
    try {
      const usu_comer = Usu_comercio.build(req.body);
      /* probar en poner MockData.JSON */
      usu_comer.save();
      res.send(usu_comer)
    } catch (error) {
      console.log("error",error)
      res.status(500).send({
        message:
          error.message || "No se ha podido crear el categoria, revisa los datos introducidos"
      });
    }
  };

  