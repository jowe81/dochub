const helpers = require("../modules/helpers");
const Document = require('../db/Document');

/**
 * Create a document record
 * @param {name, email, plaintextPassword} 
 * @returns a Promise to the new user
 */
const create = ({ title, author, userId }) => {
  return new Promise((resolve, reject) => {
    Document.create({ title, author, userId})
      .then(document => {
        resolve(document);        
      });
  });
};

const getAll = () => {
  return Document.findAll();
}

const getOne = (documentId) => {
  return Document.findByPk(documentId);
}

module.exports = {
  create,
  getAll,
  getOne,
};