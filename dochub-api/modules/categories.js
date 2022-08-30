const helpers = require("../modules/helpers");
const db = require('../models');

/**
 * Create a Category record
 * @param {name, email, plaintextPassword} 
 * @returns a Promise to the new user
 */
const create = ({ title, author, userId }) => {
  return new Promise((resolve, reject) => {
    db.Category.create({ title, author, userId})
      .then(category => {
        resolve(category);        
      });
  });
};

const getAll = () => {
  return db.Category.findAll();
}

const getOne = (categoryId) => {
  return db.Category.findByPk(categoryId);
}

module.exports = {
  create,
  getAll,
  getOne,
};