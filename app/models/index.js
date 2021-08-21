const dbConfig = require("../config/db.config.js");
var Helper = require("../config/helper");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

sequelize.sync().then(function(){
  console.log('DB connection sucessful.');
}, function(err){
  // catch error here
  console.log('error',err);

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.my_pokemon = require("./my_pokemon.model.js")(sequelize, Sequelize);

module.exports = db;