const helpers = require("../modules/helpers");
const db = require('../models');
const { Op } = require("sequelize");
const constraintTypes = require('./constraintTypes');
const constraint = require("../models/constraint");

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

const hasConstraint = ({documentId, constraintId}) => {
  return new Promise((resolve, reject) => {
    if (!(constraintId > 0)) {
      return reject("Invalid constraintId");
    }
    getOne(documentId)
    .then(documentRecord => {      
      if (documentRecord) {
        const result = documentRecord.Constraints.filter(item => { 
          return item.id === constraintId;
        });
        resolve(result.length ? true : false);  
      } else {
        reject();
      }
    })
    .catch(reject);
  })
}

const toggleConstraint = ({documentId, constraintId}) => {
  return new Promise((resolve, reject) => {
    hasConstraint({documentId, constraintId})
      .then((hasConstraint) => {
        const operationType = hasConstraint ? "removeConstraint" : "addConstraint";
        db.Document
          .findByPk(documentId)
          .then(document => document[operationType](constraintId))
          .then(resolve)    
          .catch(reject);
      })
      .catch(reject);
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
  

const getAll = searchFor => {
  return db.Document.findAll({ 
    include: [
      db.User, 
      db.File,
      {
        model: db.Constraint,
        where: {
          label: {
            [Op.like]: '%' + searchFor +'%'
          }
        },
        required:false,      
      }
    ],
    where: { 
      [Op.or] : {
        title: {
          [Op.like]: '%' + searchFor + '%'
        }, 
        author: {
          [Op.like]: '%' + searchFor + '%'
        }, 
        description: {
          [Op.like]: '%' + searchFor + '%'
        },                
      },
    },
  });
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
  hasConstraint,
  toggleConstraint,
  findAll,
  getOne,
};