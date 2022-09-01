const helpers = require("../modules/helpers");
const db = require('../models');

/**
 * Create a Constraint record
 * @param {label, constraintTypeId} 
 * @returns a Promise to the new user
 */
const create = ({ label, constraintTypeName }) => {
  return new Promise((resolve, reject) => {
    console.log(`looking for ${constraintTypeName}`);
    db.ConstraintType.findOne({ where: { name: constraintTypeName}})
      .then(constraintType => {
        console.log('found constraint type', constraintType.name);
        db.Constraint.create({ label, constraintTypeId: constraintType.id })
        .then(constraint => {
          console.log(`created and returned`, constraint);
          resolve(constraint);        
        });
      })
  });
};

const getAll = () => {
  return db.Constraint.findAll();
}

const getOne = (id) => {
  return db.Constraint.findByPk(id);
}

module.exports = {
  create,
  getAll,
  getOne,
};