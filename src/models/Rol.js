module.exports = (sequelize, Sequelize) => {
  const Rol = sequelize.define("roles", {
    id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autincrement:true
    },
    nombre: {
      type: Sequelize.STRING,
    },
  },{
    timestamps: false,
    freezeTableName: true,
  });
  return Rol;
};