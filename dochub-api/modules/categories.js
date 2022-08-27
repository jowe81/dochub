const helpers = require("../modules/helpers");
const Category = require('../db/Category');

/**
 * Create a Category record
 * @param {name, email, plaintextPassword} 
 * @returns a Promise to the new user
 */
const create = ({ title, author, userId }) => {
  return new Promise((resolve, reject) => {
    Category.create({ title, author, userId})
      .then(category => {
        resolve(category);        
      });
  });
};

const getAll = () => {
  return Category.findAll();
}

const getOne = (categoryId) => {
  return Category.findByPk(categoryId);
}

module.exports = {
  create,
  getAll,
  getOne,
};