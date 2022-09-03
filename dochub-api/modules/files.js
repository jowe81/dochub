const helpers = require("../modules/helpers");
const db = require('../models');

/**
 * Move file 
 * @param {*} tempPath 
 * @param {*} name 
 * @param {*} fileRecordId 
 * @returns 
 */
const move = (tempPath, name, fileRecordId) => {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    const dstName = `${Date.now()}-${fileRecordId}-${name}`;  
    const dstDir = process.env.LIBPATH || './data/lib';
    const dstPath = `${dstDir}/${dstName}`;  
    fs.rename(tempPath, dstPath, err => {
      if (err) {
        res.status(500).end("Could not move file to library");
        reject(err);
      } else {
        const result = {
          dstPath,
          dstName,
          fileRecordId,
        }
        resolve(result);
      }
    });
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
const processUpload = (uploadMeta) => {
  return new Promise((resolve, reject) => {
    create({
      originalName: uploadMeta.originalFilename,
      size: uploadMeta.size,
      extension: uploadMeta.mimetype.split('/')[1],
      mimetype: uploadMeta.mimetype,
      path: uploadMeta.filepath,
    }).then(file => {
      return move(uploadMeta.filepath, uploadMeta.originalFilename, file.id)
    }).then(updatedFileInfo => {
      return db.File.update({
        path: updatedFileInfo.dstPath
      }, { where: { id: updatedFileInfo.fileRecordId }})
    }).then(resolve)
    .catch(reject);  
  });
}

const getAll = () => {
  return db.File.findAll();
}

const getOne = (id) => {
  return db.File.findByPk(id);
}

module.exports = {
  processUpload,
  getAll,
  getOne,
};