var express = require('express');
var router = express.Router();

const users = require('../modules/users');

router.get('/', function(req, res, next) {
  users.getAll().then(data => {
    console.log(data);
    res.json(data);
  })
});

/**
 * Register a new user
 */
router.post("/", (req, res, next) => {
  const { name, email, plaintextPassword } = req.body;
  users.create({name, email, plaintextPassword})
    .then((user) => {
      res.json(user);
    })
    .catch(e => {
      res.status(500).send(`${e}`);
    });
});

module.exports = router;
