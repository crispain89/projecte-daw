const {sequelize, Sequelize}= require('./db')
const Inscripcion = sequelize.define("inscripciones", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoincrement: true
    },
    id_usuario:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    id_evento:{
        type:Sequelize.INTEGER,
        allowNull: false,
    }},
    {
        timestamps: false,
});
module.exports=Inscripcion;