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
      var file = _files.file
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
          console.log("Moved file to", dstPath);
          files.create({
            originalName: file.originalFilename,
            size: file.size,
            extension: file.mimetype,
            mimetype: file.mimetype,
            path: dstPath,
          }).then(file => {
            res.send(`Success: ${dstPath}, #${file.id}`);
          });
        }
      });
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
