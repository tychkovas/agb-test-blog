'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

console.log('__dirname: ', __dirname);
console.info(`env = ${env}`);

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable],
    config
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
  console.log(`🚀 sequelize ORM ${config.dialect} connected to '${config.storage}'`);
}

sequelize.sync({ logging: (process.env.NODE_ENV !== 'production' ? console.log : null) });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.getUsers = async () => {
  return db.User.findAll();
}

db.getUser = async (request) => {
  const { id } = request; 
  return db.User.findByPk(id);
}

db.getPosts = async () => {
  return db.Post.findAll();
}

db.getPost = async (request) => {
  const { id } = request; 
  return db.Post.findByPk(id);
}

db.getComments = async () => {
  return db.Comment.findAll();
}

db.getComment = async (request) => {
  const { id } = request; 
  return db.Comment.findByPk(id);
}

module.exports = db;
