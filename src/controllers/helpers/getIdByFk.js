const { Op } = require("sequelize");
const db = require("../../models");

getIdByFk = async (req, res, model, modelId) => {
    
    try {
        console.log("PATH", req.path)
        console.log("QUERY", req.query)
        console.log("ROUTE", req.route)
        const { id } = req.params;
        let models;

        models = await model.findAll({
            where: 
                {
                    [modelId]: id
                }
            
        });
        res.status(202).send({message: "se ha actualizado correctamente"})
        console.log("models", models)
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "No hemos podido crear la promocion"
        });
    }

}
module.exports = getIdByFk;