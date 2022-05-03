/* Modelo */
module.exports=(sequelize, Sequelize)=>{
    const Comercio = sequelize.define("comercio", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoincrement: true
        },
        nombre:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        poblacion:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        email:{
            type:Sequelize.STRING,
            validate:{
                isEmail: true
              },
            allowNull: false,
        },
        latitud:{
            type:Sequelize.STRING,
            allowNull: false
        },
        longitud:{
            type:Sequelize.STRING,
            allowNull: false
        },
        logo_id:{
            type:Sequelize.INTEGER,
            allowNull: true
        },
        categoria_id:{
            type:Sequelize.INTEGER,
            allowNull: false
        }
    },{
        timestamps: false,
    });
    return Comercio;
};