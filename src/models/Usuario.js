module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define("usuario", {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apellidos: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    contraseña: {
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
      allowNull: false,
    },
    rol_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    avatar_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  },{
    timestamps: false
  });
  return Usuario;
};