/* Modelo */
module.exports=(sequelize, Sequelize)=>{
    const Evento = sequelize.define("evento", {
        id:{
            type:Sequelize.INTEGER,
            autoincrement: true
        },
        nombre:{
            type:Sequelize.STRING,
            primaryKey:true,
            allowNull: false,
        },
        edicion:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull: false,
        },
        lugar:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        fecha_inicio:{
            type:Sequelize.DATEONLY,
            allowNull: false
        },
        fecha_finalizacion:{
            type:Sequelize.DATEONLY,
            allowNull: true
        }},
            {
            timestamps: false,
            
        });
    return Evento;
};