const helpers = require("../modules/helpers");
const db = require('../models');

/**
 * Create a Constraint record
 * @param {label, constraintTypeId} 
 * @returns a Promise to the new user
 */
const create = ({ label, constraintTypeId }) => {
  return new Promise((resolve, reject) => {
    db.Constraint.create({ label, constraintTypeId })
      .then(constraint => {
        resolve(constraint);        
      });
  });
};

const getAll = () => {
  return db.Constraint.findAll();
}

const getOne = (constraintId) => {
  return db.Constraint.findByPk(constraintId);
}

module.exports = {
  create,
  getAll,
  getOne,
};