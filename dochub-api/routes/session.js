const router = require("express").Router();
const errorIfUnauthorized = require("../middleware/errorIfUnauthorized");

const db = require('../models');
const users = require('../modules/users');

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  users.findByEmail(email)
    .then(user => {
      req.session.user = user;
      res.json(user);
    })
    .catch(next);
});

router.get("/logout", errorIfUnauthorized, (req, res) => {
  const name = req.session.user.name;
  res.end(`Goodbye, ${name}!`);
  req.session = null;
});

router.get("/me", errorIfUnauthorized, (req, res) => {
  res.json(req.session.user);
});

module.exports = router;