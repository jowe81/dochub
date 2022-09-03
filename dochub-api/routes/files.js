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

/**
 * Post a new file
 */
router.post("/", (req, res, next) => {
  const IncomingForm = require('formidable').IncomingForm
  const form = new IncomingForm()
  form.uploadDir = process.env.UPLOADPATH || './data/upload';
  form.parse(req, function(err, fields, _files) {
    console.log(form.uploadDir, 'files:');
    console.log(_files);
    if (err) {
      res.status(500).end(err);
      console.log(err);
    } else if (!_files.file) {
      res.status(500).end("Error no file");
    } else {
      files.processUpload(_files.file)
        .then(fileRecord => {
          res.json(fileRecord);
        })
        .catch(err => res.status(500).end(`Could not process file ${err}`));
    }
  });

  // constraints.create({label, constraintTypeName})
  //   .then((constraint) => {
  //     res.json(constraint);
  //   })
  //   .catch(e => {
  //     res.status(500).send(`${e}`);
  //   });
});

module.exports = router;