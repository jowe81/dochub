const helpers = require("../modules/helpers");
const db = require('../models');
const { Op } = require("sequelize");
const constraintTypes = require('./constraintTypes');

//Set or remove a single constraint
const updateConstraint = ({documentId, constraintId, checked}) => {
  return new Promise((resolve, reject) => {
    const operationType = checked ? "addConstraint" : "removeConstraint";
    db.Document
      .findByPk(documentId)
      .then(document => document[operationType](constraintId))
      .then(resolve)
  });
};

/**
 * Create a document record
 * @param {name, email, plaintextPassword} 
 * @returns a Promise to the new user
 */
const create = ({ title, author, constraints, description, userId }) => {
  return new Promise((resolve, reject) => {
    db.Document.create({ 
      title, 
      author:author || '', 
      description:description || '', 
      userId
    }).then(document => {
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

const update = ({ id, title, description, author }) => { 
  return new Promise((resolve, reject) => {
    db.Document.update({ title, description, author }, { where: { id }})
    .then(res => {
      resolve(`new title ${title}, id ${id}`);
    }).catch(reject);
  })
};
  

const getAll = () => {
  return db.Document.findAll({ include: [db.User, db.Constraint, db.File] });
}

const getOne = (documentId) => {
  return db.Document.findByPk(documentId, { include:[db.Constraint, db.User, db.File]});
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
  update,
  getAll,
  getByConstraint,
  updateConstraint,
  findAll,
  getOne,
};