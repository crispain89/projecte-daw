const dbConfig = require("../config/database.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.usuario = require("./Usuario.js")(sequelize, Sequelize);
db.token = require("./Token.js")(sequelize, Sequelize);
db.rol = require("./Rol.js")(sequelize, Sequelize);
db.evento=require("./Evento.js")(sequelize, Sequelize);
db.comercio=require("./Comercio.js")(sequelize, Sequelize);
db.descuento=require("./Promocion.js")(sequelize, Sequelize);


module.exports = db;