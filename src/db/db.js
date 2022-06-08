import {dirname} from 'path';
import Sequelize from 'sequelize';
import { fileURLToPath } from 'url';
import config from './config/config.json' assert { type: 'json' };

import post from './models/post.js';
import user from './models/user.js';
import comment from './models/comment.js';

const basename = fileURLToPath(import.meta.url);
const __dirname = dirname(basename)

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];
console.log('config: ', config);

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


db.Post = post(sequelize, Sequelize.DataTypes);
db.User = user(sequelize, Sequelize.DataTypes);
db.Comment = comment(sequelize, Sequelize.DataTypes);


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

db.createPost = async (_post) => {
  console.log('db:createPost:_post =', _post);
  const post = _post;
  if (!post?.published_at) post.published_at = new Date();
  post.userId = 1;
  console.log('db:createPost:post = ', post);
  const newPost = await db.Post.create(post)
  console.log('db:createPost:newPost.title =', newPost.title);
  return newPost;
}

db.updatePost = async (id, _post) => {
  console.log('db:updatedPost: id, _post =', id, _post);
  const post = await db.Post.findByPk(id);
  console.log('db:updatedPost:old post.title =', post.title);
  if (post) {
    post.set(_post);
    if (!post.userId)  post.userId = 1;
    await post.save();
  } else {
    throw new Error('not find post');
  }
  console.log(`db:updatePost:new post.title = ${post.title}`);
  return post;
}

db.deletePost = async (id) => {
  console.log('db:deletePost:id:', id);
  const post = await db.Post.findByPk(id);
  console.log(`db:deletePost:post.title: ${post.title}`);
  if (post) {
    await post.destroy();
  } else {
    throw new Error('not find post');
  }
  console.log(`db:deletePost:OK:post.title = ${post.title}`);

  return post;
}

export default db;
