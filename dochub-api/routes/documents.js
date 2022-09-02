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
  console.log(req.session.user);
  documents.create({title, author, constraints, userId: req.session.user.id})
    .then((document) => {
      res.json(document);
    })
    .catch(e => {
      res.status(500).send(`${e}`);
    });
});

module.exports = router;
