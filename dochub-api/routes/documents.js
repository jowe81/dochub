const e = require('express');
var express = require('express');
const constraint = require('../models/constraint');
var router = express.Router();

const documents = require('../modules/documents');

router.get('/', function(req, res, next) {
  documents.getAll().then(data => {
    console.log(data);
    res.json(data);
  })
});

router.get('/by/:constraintTypeName/', function(req, res) {
  const constraintTypeName = req.params.constraintTypeName;
  const constraintIds = req.query.ids.split(',');
  documents.getByConstraint([constraintTypeName], constraintIds)
    .then(documents => {
      res.json(documents);
    });
});

router.get('/:id', function(req, res, next) {
  documents.getOne(req.params.id).then(data => {
    console.log(data);
    res.json(data);
  })
});

/**
 * Post a new document
 */
router.post("/", (req, res, next) => {
  const { title, author, constraints } = req.body;
  // Somewhere at the start of your file
  const IncomingForm = require('formidable').IncomingForm
  const form = new IncomingForm()
  form.uploadDir = 'uploads'
  form.parse(req, function(err, fields, files) {
    console.log('files:');
    console.log(files);
    if (err) {
      res.status(500).end("Error uploading");
    } else if (!files.file) {
      res.status(500).end("Error no file");
    } else {
      var file = files.file
      //Move the file
      fs = require('fs');
      const dstDir = process.env.LIBPATH || './data/lib';
      const dstPath = `${dstDir}/${file.originalFilename}`;
      console.log(`Moving file from ${file.filepath} to ${dstPath}`);
      fs.rename(file.filepath, dstPath, err => {
        if (err) {
          console.log("Could not move file", err)
          res.status(500).end("Could not move file to library");
        } else {
          console.log("Moved file to", dstPath)
          res.send(`Success: ${dstPath}, ${file.originalFilename}, ${file.size}`);
        }
      });
    }
  })


  /*

  console.log(req.session.user);
  documents.create({title, author, constraints, userId: req.session.user.id})
    .then((document) => {
      res.json(document);
    })
    .catch(e => {
      res.status(500).send(`${e}`);
    });
    */
});

module.exports = router;
