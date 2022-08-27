const helpers = require("../modules/helpers");
const db = require('../models');
const bcrypt = require('bcrypt');

/**
 * Create a user record
 * @param {name, email, plaintextPassword} 
 * @returns a Promise to the new user
 */
const create = ({ name, email, plaintextPassword }) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plaintextPassword, 10, (err, password) => {
      if (err) reject(err);
      db.User.create({name, email, password})
        .then(resolve)
        .catch(reject);    
    })
  });
};

const getAll = () => {
  return db.User.findAll();
}

module.exports = {
  create,
  getAll,
};