const helpers = require("../modules/helpers");
const db = require('../models');
const fs = require('fs/promises');

/**
 * Move file 
 * @param {*} tempPath 
 * @param {*} name 
 * @param {*} fileRecordId 
 * @returns 
 */
const move = (tempPath, name, fileRecordId) => {
  return new Promise((resolve, reject) => {
    const dstName = `${Date.now()}-${fileRecordId}-${name}`;  
    const dstDir = process.env.LIBPATH || './data/lib';
    const dstPath = `${dstDir}/${dstName}`;  
    fs.rename(tempPath, dstPath)
      .then(() => {
        const result = {
          dstPath,
          dstName,
          fileRecordId,
        }
        return (result);
      })
      .then(resolve)
      .catch(reject);
  });
}

/**
 * Create a file record
 * @param { name, extension, size, mimetype, path }  
 * @returns a promise to the new file record
 */
const create = ({ name, extension, size, mimetype, path }) => {
  return new Promise((resolve, reject) => {
    db.File.create({ name, extension, size, mimetype, path })
      .then(file => {
        resolve(file);
      });
  });
};

/**
 * Move file to library and create a database record
 * @param {*} uploadMeta 
 * @returns the file record
 */
const processUpload = (uploadMeta, documentId) => {
  return new Promise((resolve, reject) => {
    create({
      originalName: uploadMeta.originalFilename,
      size: uploadMeta.size,
      extension: uploadMeta.mimetype.split('/')[1],
      mimetype: uploadMeta.mimetype,
      path: uploadMeta.filepath,
      documentId,
    })
    .then(file => move(uploadMeta.filepath, uploadMeta.originalFilename, file.id))
    .then(updatedFileInfo => {
      //Sadly, sequelize.update does not return the updated record -> have to fetch it
      return new Promise((resolve, reject) => {
        db.File.update({
          path: updatedFileInfo.dstPath,
          originalName: uploadMeta.originalFilename,
          documentId,
        }, { 
          where: { id: updatedFileInfo.fileRecordId },
        }).then(() => getOne(updatedFileInfo.fileRecordId))
        .then(updatedFileRecord => resolve(updatedFileRecord))  
      })
    })
    .then((updatedFileRecord) => {
      resolve(updatedFileRecord);
    })
    .catch(reject);  
  });
}

const getAll = () => {
  return db.File.findAll();
}

const getOne = (id) => {
  return db.File.findByPk(id);
}

const remove = id => {
  return new Promise((resolve, reject) => {
    if (!isNaN(Number(id))) {
      getOne(id)
      .then(file => file !== null ? fs.unlink(file?.path) : reject())
      .then(() => db.File.destroy({ where: { id }}))
      .then(resolve)
      .catch(reject);
    } else {
      return reject(`Invalid ID: ${id}`);
    }
  })
}

module.exports = {
  processUpload,
  getAll,
  getOne,
  remove,
};