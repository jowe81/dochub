const helpers = require("../modules/helpers");
const db = require('../models');
const { Op } = require("sequelize");
const constraintTypes = require('./constraintTypes');

/**
 * Create a document record
 * @param {name, email, plaintextPassword} 
 * @returns a Promise to the new user
 */
const create = ({ title, author, constraints, userId }) => {
  return new Promise((resolve, reject) => {
    db.Document.create({ title, author, userId})
      .then(document => {
        if (constraints) {
          document.addConstraints(constraints)
          .then(document => {
            console.log(`added constraints`, constraints);
            resolve(document);        
          });
        } else {
          resolve(document);
        }
      });
  });
};

const getAll = () => {
  return db.Document.findAll({ include: [db.User, db.Constraint] });
}

const getOne = (documentId) => {
  return db.Document.findByPk(documentId, { include:[db.Constraint, db.User]});
};

const getByConstraint = (constraintTypeNames, constraintIds) => {
  return new Promise((resolve, reject) => {
    constraintTypes.getByNames(constraintTypeNames)
      .then(constraintTypeRecords => {
        const constraintTypeIds = constraintTypeRecords.map(record => record.id);
        db.Document.findAll({
          include: {
            model: db.Constraint,
            where: {
              constraintTypeId: {
                [Op.in]: constraintTypeIds,
              },
              id: {
                [Op.in]: constraintIds,
              }
            }
          }
        }).then(documentRecords => {
          resolve(documentRecords);
        });
      });
  });
}

const findAll = options => db.Document.findAll;

module.exports = {
  create,
  getAll,
  getByConstraint,
  findAll,
  getOne,
};