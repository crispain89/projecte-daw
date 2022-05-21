const {sequelize, Sequelize}=require('./db')
const Categoria =sequelize.define('categorias',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoincrement: true
    },
    categoria:{
        type:Sequelize.STRING,
        allowNull: false

    }},{
        timestamps:false
    }
);
module.exports = Categoria;