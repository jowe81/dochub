const helpers = require("../modules/helpers");
const db = require('../models');

/**
 * Create a Constraint record
 * @param {label, constraintTypeId} 
 * @returns a Promise to the new user
 */
const create = ({ label, constraintTypeName }) => {
  return new Promise((resolve, reject) => {
    db.ConstraintType.findOne({ where: { name: constraintTypeName}})
      .then(constraintType => {
        db.Constraint.create({ label, constraintTypeId: constraintType.id })
        .then(constraint => {
          resolve(constraint);        
        });
      })
  });
};

/**
 * Return constraints by type. Where can contain id or name.
 * @param {*} where 
 * @returns 
 */
const getByType = (where) => {
  return db.Constraint.findAll({ 
    include: { 
      model: db.ConstraintType, 
      where,
    }
  })
};

const getAll = (options) => {
  return db.Constraint.findAll(options);
}

const getOne = (id) => {
  return db.Constraint.findByPk(id);
}

module.exports = {
  create,
  getByType,
  getAll,
  getOne,
};