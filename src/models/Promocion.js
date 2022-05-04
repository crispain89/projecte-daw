/* Modelo */
module.exports=(sequelize, Sequelize)=>{
    const Promocion = sequelize.define("promociones", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoincrement: true
        },
        token:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        descripcion:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        fecha_inicio:{
            type:Sequelize.DATEONLY,
            allowNull: false,
        },
        fecha_expiracion:{
            type:Sequelize.DATEONLY,
            allowNull: false
        },
        comercio_id:{
            type:Sequelize.INTEGER,
            allowNull: false
        },
        evento_id:{
            type:Sequelize.INTEGER,
            allowNull: true
        },
        imagen_id:{
            type:Sequelize.INTEGER,
            allowNull: true
        }
    },{
        timestamps: false,
        freezeTableName: true,
    });
    return Promocion;
};