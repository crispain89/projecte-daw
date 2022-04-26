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
      type: Sequelize.STRING
    },
    fecha_nacimiento: {
      type: Sequelize.STRING
    },
    dni: {
      type: Sequelize.STRING
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