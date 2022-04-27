module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define("usuario", {
    nombre: {
      type: Sequelize.STRING
    },
    apellidos: {
      type: Sequelize.STRING
    },
    contraseña: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      validate:{
        isEmail: true
      }
    },
    fecha_nacimiento: {
      type: Sequelize.DATEONLY
    },
    dni: {
      type: Sequelize.STRING,
      unique: true
    },
    rol_id: {
      type: Sequelize.INTEGER
    },
    avatar_id: {
      type: Sequelize.INTEGER
    }
  },{
    timestamps: false
  });
  return Usuario;
};