module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define("usuario", {
    id:{
      type:Sequelize.INTEGER,
      primaryKey:true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apellidos: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      validate:{
        isEmail: true
      },
      allowNull: false,
    },
    fecha_nacimiento: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    dni: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
    },
    rol_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    avatar_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    token_activado:{
      type: Sequelize.BOOLEAN,
    }
  },{
    timestamps: false
  });
  return Usuario;
};