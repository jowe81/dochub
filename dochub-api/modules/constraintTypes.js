const helpers = require("../modules/helpers");
const db = require('../models');

/**
 * Create a ConstraintType record
 * @param {name} 
 * @returns a Promise to the new constraintType record
 */
const create = ({ name }) => {
  return new Promise((resolve, reject) => {
    getAll({where: {name}})
      .then(res => {
        if (res.length>0) {
          return reject(`Constraint type '${name}' already exists.`);
        }
        db.ConstraintType.create({ name })
        .then(constraintType => {
          resolve(constraintType);        
        });
      }).catch(reject);
  });
};

const getByName = name => {
  return db.ConstraintType.findOne({where: { name }});
}

//Retrieve multiple records by constraint type names
const getByNames = names => {
  return new Promise((resolve, reject) => {
    const promises = [];
    names.forEach((name) => {
      promises.push(getByName(name));
    });
    console.log(`got ${promises.length} promises`);
    Promise.all(promises)
      .then(constraintTypeRecords => {
        console.log(constraintTypeRecords);
        resolve(constraintTypeRecords);
      })
  });
}

const getAll = (where) => {
  return db.ConstraintType.findAll(where);
}

const getOne = (id) => {
  return db.ConstraintType.findByPk(id);
}

const update = (updatedRecord) => {
  return new Promise((resolve, reject) => {
    db.ConstraintType
      .update(updatedRecord, { where: {id: updatedRecord.id }})
      .then(res => {
        if (res > 0) {
          getOne(updatedRecord.id)
            .then(record => resolve(record));
        } else {
          reject("Update failed");
        }
      });
  })
  return 
}

const remove = (id) => db.ConstraintType.destroy({where: { id }});

module.exports = {
  create,
  getByName,
  getByNames,
  getAll,
  getOne,
  update,
  remove,
};