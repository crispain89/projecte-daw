/* Modelo */
const {sequelize, Sequelize}= require('./db')
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

    //Comercio.hasMany(Promocion, {foreignKey: 'id'})

   // Comercio.hasMany(Evento, { through: 'Promociones', /* options */ });
Comercio.getEventos = async function (id) {
/* return await Comercio.findOne({
        where: { 'id': id},
        include: Promocion,
        include: Evento
    });
    */
    /* return await Comercio.findOne({
        where: {
            id: id
        }, 
        include: {
            model:Promocion, 
            include: {
                model:Evento,               
            }
        }
    }) */
    const query =`select e.nombre, e.edicion, e.fecha_inicio, p.descripcion, p.comercio_id
    from eventos as e, promociones as p
    where p.comercio_id=${id} and p.evento_id=e.id`

    const result = await sequelize.query(query, 
    { 
        model: Comercio, mapToModel: true,
        nest: true,
        raw: true,
        type: sequelize.QueryTypes.SELECT 
    })
    console.log("RESULT",result)
    return result;
}

module.exports = Comercio;