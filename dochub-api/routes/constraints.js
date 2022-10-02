var express = require('express');
var router = express.Router();

const constraints = require('../modules/constraints');

const errorIfUnauthorized = require("../middleware/errorIfUnauthorized");


//Get constraints by type; specify either type id or type name
router.get('/byType', function(req, res, next) {
  const options = {};
  const id = req.query.id;
  const name = req.query.name;
  if (id) {
    options.id = id;
  } else if (name) {
    options.name = name;
  }
  constraints.getByType(options).then(data => {
    console.log(`Constraints: `, data);
    res.json(data);
  })
});

router.get('/:id', function(req, res, next) {
  constraints.getOne(req.params.id).then(data => {
    console.log(data);
    res.json(data);
  })
});

router.get('/', function(req, res, next) {
  constraints
    .getAll()
    .then(data => {
      console.log(data)
      res.json(data);
    });
});

router.post("/", errorIfUnauthorized, (req, res, next) => {
  const { label, constraintTypeName, constraintTypeId } = req.body;
  if (constraintTypeId) {
    constraints.createByTypeId({label, constraintTypeId})
    .then((constraint) => {
      res.json(constraint);
    })
    .catch(e => {
      res.status(500).send(`${e}`);
    });

  } else {
    constraints.create({label, constraintTypeName})
    .then((constraint) => {
      res.json(constraint);
    })
    .catch(e => {
      res.status(500).send(`${e}`);
    });
  }
});

module.exports = router;
