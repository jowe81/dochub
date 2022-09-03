const helpers = require("../modules/helpers");
const db = require('../models');

/**
 * Create a File record
 * @param {label, constraintTypeId} 
 * @returns a Promise to the new user
 */

const move = (tempPath, name, fileRecordId) => {
  console.log("Moving...", fileRecordId);
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    const dstName = `${Date.now()}-${fileRecordId}-${name}`;
  
    const dstDir = process.env.LIBPATH || './data/lib';
    const dstPath = `${dstDir}/${dstName}`;
  
    console.log(`Moving file from ${tempPath} to ${dstPath}`);
    fs.rename(tempPath, dstPath, err => {
      if (err) {
        console.log("Could not move file", err)
        res.status(500).end("Could not move file to library");
        reject(err);
      } else {
        console.log("Moved file to", dstPath);
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

const create = ({ name, extension, size, mimetype, path }) => {
  console.log("Creating record...");
  return new Promise((resolve, reject) => {
    db.File.create({ name, extension, size, mimetype, path })
      .then(file => {
        resolve(file);
      });
  });
};

const processUpload = (uploadMeta) => {
  console.log("Processing uploade...");
  return new Promise((resolve, reject) => {
    create({
      originalName: uploadMeta.originalFilename,
      size: uploadMeta.size,
      extension: uploadMeta.mimetype.split('/')[1],
      mimetype: uploadMeta.mimetype,
      path: uploadMeta.filepath,
    }).then(file => {
      console.log(`file: `, file);
      return move(uploadMeta.filepath, uploadMeta.originalFilename, file.id)
    }).then(updatedFileInfo => {
      return db.File.update({
        path: updatedFileInfo.dstPath
      }, { where: { id: updatedFileInfo.fileRecordId }})
    }).then(resolve)
    .catch(err => {
      reject(err);
    });  
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