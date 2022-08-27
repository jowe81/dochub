const helpers = require("../modules/helpers");
const db = require('../models');

/**
 * Create a document record
 * @param {name, email, plaintextPassword} 
 * @returns a Promise to the new user
 */
const create = ({ title, author, categories, userId }) => {
  return new Promise((resolve, reject) => {
    db.Document.create({ title, author, userId})
      .then(document => {
        /*
        document.addCategories(categories)
          .then(document => {
            resolve(document);        
          });
        */
       resolve(document);
      });
  });
};

const getAll = () => {
  return db.Document.findAll();
}

const getOne = (documentId) => {
  return db.Document.findByPk(documentId);
}

module.exports = {
  create,
  getAll,
  getOne,
};