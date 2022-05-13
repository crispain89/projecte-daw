const {sequelize, Sequelize}= require('./db')
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
Usuario.getInscripciones= async function(req){
  const id= req.params.id;
  const query= ` SELECT e.nombre, e.lugar, e.descripcion, e.edicion, e.src, e.fecha_inicio, e.fecha_finalizacion, i.id_usuario, i.id_evento
  FROM inscripciones as i, eventos as e
  WHERE i.id_usuario=${id} and i.id_evento=e.id`

  const result = await sequelize.query(query, 
      { 
        model: Usuario, mapToModel: true,
        nest: true,
        raw: true,
        type: sequelize.QueryTypes.SELECT 
      })
      console.log("RESULT",result)
    return result;
  
}
Usuario.getPromociones= async function(req){
  const id = req.params.id;
  const query=`SELECT e.nombre as evento_nombre, p.fecha_inicio,p.fecha_expiracion,p.descripcion, p.titulo,i.id_evento,p.src,c.nombre as comercio_nombre, c.poblacion,p.comercio_id,p.src
  FROM (( usuarios as u
  INNER JOIN inscripciones as i ON i.id_usuario= u.id
  INNER JOIN eventos as e ON e.id=i.id_evento
  INNER JOIN promociones as p ON p.evento_id=e.id 
  INNER JOIN comercios as c ON c.id=p.comercio_id))
  WHERE u.id=${id}`

  const result = await sequelize.query(query, 
    { 
      model: Usuario, mapToModel: true,
      nest: true,
      raw: true,
      type: sequelize.QueryTypes.SELECT 
    })
    console.log("RESULT",result)
  return result;
}
Usuario.getPromocionesExpiredByUser= async function(req){
  const id=req.params.id;
  const query=`SELECT e.nombre, p.fecha_inicio,p.fecha_expiracion,p.descripcion, p.titulo, i.id_evento,p.src,c.nombre, c.poblacion,p.comercio_id
  FROM (( usuarios as u
  INNER JOIN inscripciones as i ON i.id_usuario= u.id
  INNER JOIN eventos as e ON e.id=i.id_evento
  INNER JOIN promociones as p ON p.evento_id=e.id 
  INNER JOIN comercios as c ON c.id=p.comercio_id))
  WHERE u.id=${id} and p.fecha_expiracion < curdate()`
}
Usuario.getPromocionesCurrentByUser= async function(req){
  const id=req.params.id;
  const query=`SELECT e.nombre, p.fecha_inicio,p.fecha_expiracion,p.descripcion, p.titulo, i.id_evento,p.src,c.nombre, c.poblacion,p.comercio_id
  FROM (( usuarios as u
  INNER JOIN inscripciones as i ON i.id_usuario= u.id
  INNER JOIN eventos as e ON e.id=i.id_evento
  INNER JOIN promociones as p ON p.evento_id=e.id 
  INNER JOIN comercios as c ON c.id=p.comercio_id))
  WHERE u.id=${id} and p.fecha_expiracion > curdate()`
}
Usuario.getPromocionesById= async function(req){
  const id=req.params.id;
  const query=`SELECT e.nombre, p.fecha_inicio,p.fecha_expiracion,p.descripcion, p.titulo, i.id_evento,p.src
  FROM (( usuarios as u
  INNER JOIN inscripciones as i ON i.id_usuario= u.id
  INNER JOIN eventos as e ON e.id=i.id_evento
  INNER JOIN promociones as p ON p.evento_id=e.id))
  WHERE u.id=${id}`

  const result = await sequelize.query(query, 
    { 
      model: Usuario, mapToModel: true,
      nest: true,
      raw: true,
      type: sequelize.QueryTypes.SELECT 
    })
    console.log("RESULT",result)
  return result;
}
module.exports=Usuario