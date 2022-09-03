const helpers = require("../modules/helpers");
const db = require('../models');

/**
 * Create a File record
 * @param {label, constraintTypeId} 
 * @returns a Promise to the new user
 */
const create = ({ name, extension, size, mimetype, path }) => {
  return new Promise((resolve, reject) => {
    db.File.create({ name, extension, size, mimetype, path })
      .then(file => {
        resolve(file);
      });
  });
};

const getAll = () => {
  return db.File.findAll();
}

const getOne = (id) => {
  return db.File.findByPk(id);
}

module.exports = {
  create,
  getAll,
  getOne,
};