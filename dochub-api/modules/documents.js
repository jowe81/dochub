const helpers = require("../modules/helpers");
const Document = require('../db/Document');

/**
 * Create a document record
 * @param {name, email, plaintextPassword} 
 * @returns a Promise to the new user
 */
const create = ({ name, author, userId }) => {
  return new Promise((resolve, reject) => {
    resolve (`${name} | ${author} | ${userId}`);
  });
};

const getAll = () => {
  return Document.findAll();
}

module.exports = {
  create,
  getAll,
};