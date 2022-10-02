const e = require('express');
var express = require('express');
const constraint = require('../models/constraint');
var router = express.Router();

const documents = require('../modules/documents');
const files = require('../modules/files');

const errorIfUnauthorized = require("../middleware/errorIfUnauthorized");

router.get('/', function(req, res) {
  console.log(req.query, req.params);
  const searchFor = req.query.searchFor || '';
  console.log(`Searchin for ${searchFor}`);
  documents
    .getAll(searchFor)
    .then(data => res.json(data));
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
    res.json(data);
  })
});

/* Protected write operations below */

router.post("/:id/update-constraint/toggle", errorIfUnauthorized, function(req, res){
  const documentId = req.params.id;
  const constraintId = Number(req.body.constraintId);
  documents.toggleConstraint({documentId, constraintId})
    .then(result => {
      res.json('success');
    })
    .catch(err => {
      console.log("Error" , err);
    });
});

router.post("/:id/update-constraint/", errorIfUnauthorized, function(req, res){
  const documentId = req.params.id;
  const { constraintId, checked } = req.body;
  documents.updateConstraint({documentId, constraintId, checked})
    .then(result => {
      res.json('success');
    });
});

router.post("/", errorIfUnauthorized, (req, res, next) => {
  const { title, author, description, constraints } = req.body;
  documents.create({title, author, description, constraints, userId: req.session.user?.id || 1})
    .then((document) => {
      res.json(document);
    })
    .catch(e => {
      res.status(500).send(`${e}`);
    });
});

router.put("/:id", errorIfUnauthorized, (req, res, next) => {
  const { id, title, description, author } = req.body;
  documents.update({id, title, description, author})
    .then((data) => {
      res.json(`success: ${data}`);
    })
    .catch(e => {
      res.status(500).send(e);
    });
});

module.exports = router;
