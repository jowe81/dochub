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

router.put('/:id', errorIfUnauthorized, (req, res, next) => {
  const updatedRecord = { ...req.body };
  console.log("Updating to: ", updatedRecord);
  constraintTypes
    .update(updatedRecord)
    .then(data => {
      console.log("returned with ", data);
      res.json(data);
    });
});

router.delete("/:id", errorIfUnauthorized, (req, res) => {
  constraintTypes
    .remove(req.params.id)
    .then((data) => res.json(data));
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
    res.json({'success': false, error_message: e});
  });
});

module.exports = router;
