var express = require('express');
var router = express.Router();

const constraintTypes = require('../modules/constraintTypes');

const errorIfUnauthorized = require("../middleware/errorIfUnauthorized");

router.get('/:id', function(req, res, next) {
  constraintTypes.getOne(req.params.id).then(data => {
    console.log(data);
    res.json(data);
  })
});

router.get('/', function(req, res, next) {
  constraintTypes
    .getAll()
    .then(data => {
      console.log(data)
      res.json(data);
    });
});

router.post("/", errorIfUnauthorized, (req, res, next) => {
  const constraintTypeName  = req.body.name;
  constraintTypes.create({name: constraintTypeName})
  .then((constraintType) => {
    res.json(constraintType);
  })
  .catch(e => {
    res.status(500).send(`${e}`);
  });
});

module.exports = router;
