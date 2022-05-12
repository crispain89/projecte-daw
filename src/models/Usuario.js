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
  const {id, nid}=req.params.id;
  const query=`SELECT e.nombre, p.fecha_inicio,p.fecha_expiracion,p.token,p.descripcion
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
Usuario.getPromocionesById= async function(req){
  const id=req.params.id;
  const query=`SELECT e.nombre, p.fecha_inicio,p.fecha_expiracion,p.token,p.descripcion
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