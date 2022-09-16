var express = require('express');
var router = express.Router();

const files = require('../modules/files');

router.get('/', function(req, res, next) {
  files.getAll().then(data => {
    res.json(data);
  })
});

router.get('/:id', function(req, res, next) {
  files.getOne(req.params.id).then(data => {
    console.log(data);
    res.json(data);
  })
});

router.get('/:id/download', function(req, res, next) {
  files.getOne(req.params.id).then(file => {
    res.download(file.path, file.originalName, function (err) {
      if (err) {
        // Handle error, but keep in mind the response may be partially-sent
        // so check res.headersSent
        res.err(err);
      } else {
        // decrement a download credit, etc.
        
      }
    })  
  })
});

/**
 * Post a new file
 */
router.post("/", (req, res, next) => {
  const documentId = req.query.documentId;
  const IncomingForm = require('formidable').IncomingForm
  const form = new IncomingForm()
  form.uploadDir = process.env.UPLOADPATH || './data/upload';
  form.parse(req, function(err, fields, _files) {
    console.log(form.uploadDir, 'files:');
    console.log(_files);
    if (err) {
      res.status(500).end(err);
    } else if (!_files.file) {
      res.status(500).end("No file submitted");
    } else {
      files.processUpload(_files.file, documentId)
        .then(fileRecord => {
          res.json(fileRecord);
        })
        .catch(err => res.status(500).end(`Could not process file ${err}`));
    }
  });
});

router.delete("/:id", (req, res) => {
  files
    .remove(req.params.id)
    .then(res.end("file deleted"));
});

module.exports = router;
