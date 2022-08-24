var express = require('express');
var router = express.Router();

const User = require('../db/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findAll().then(data => {
    console.log(data);
    res.json(data);
  })
});

router.post("/", (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  User.create({name, email, password})
    .then(() => {
      res.json({ message: "OK!" });
    });
});

module.exports = router;
