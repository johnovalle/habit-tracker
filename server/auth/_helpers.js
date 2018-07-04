const bcrypt = require('bcryptjs');
const db = require('../db');

function createUser(req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return db('users')
    .insert({
      username: req.body.username,
      password_digest: hash
    })
    .returning('*');
}

function getUser(username) {
  return new Promise((resolve, reject) => {
    db('users').where({username}).first().then((data) => {
      if(data) {
        resolve(data);
      } else {
        reject('user not found');
      }
    });
  });
}

function comparePass(userPassword, databasePassword) {
  if(bcrypt.compareSync(userPassword, databasePassword)) {
    return true;
  } else {
    throw new Error('bad password');
  }
}

module.exports = {
  createUser,
  getUser,
  comparePass
};
