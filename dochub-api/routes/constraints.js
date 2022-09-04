var express = require('express');
var router = express.Router();

const constraints = require('../modules/constraints');

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



/**
 * Post a new category
 */
router.post("/", (req, res, next) => {
  const { label, constraintTypeName } = req.body;
  constraints.create({label, constraintTypeName})
    .then((constraint) => {
      res.json(constraint);
    })
    .catch(e => {
      res.status(500).send(`${e}`);
    });
});

module.exports = router;
