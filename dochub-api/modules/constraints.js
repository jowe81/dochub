const helpers = require("../modules/helpers");
const db = require('../models');

/**
 * Create a Constraint record
 * @param {label, constraintTypeId} 
 * @returns a Promise to the new user
 */
const create = ({ label, constraintTypeName }) => {
  return new Promise((resolve, reject) => {
    db.ConstraintType.find({name: constraintTypeName})
      .then(constraintType => {
        db.Constraint.create({ label, constraintTypeId: constraintType.id })
        .then(constraint => {
          resolve(constraint);        
        });
      })
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