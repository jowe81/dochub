var express = require('express');
var router = express.Router();

const categories = require('../modules/categories');

router.get('/', function(req, res, next) {
  categories.getAll().then(data => {
    console.log(`Categories: `, data);
    res.json(data);
  })
});

router.get('/:id', function(req, res, next) {
  categories.getOne(req.params.id).then(data => {
    console.log(data);
    res.json(data);
  })
});



/**
 * Post a new category
 */
router.post("/", (req, res, next) => {
  const { name } = req.body;
  categories.create({name})
    .then((category) => {
      res.json(category);
    })
    .catch(e => {
      res.status(500).send(`${e}`);
    });
});

module.exports = router;
