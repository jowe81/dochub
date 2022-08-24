const router = require("express").Router();
const errorIfUnauthorized = require("../middleware/errorIfUnauthorized");

const User = require('../db/User');

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  User.findOne({ where: { email }})
    .then(res.json)
    .catch(next);
});

router.get("/logout", errorIfUnauthorized, (req, res) => {
  const firstName = req.session.user.first_name;
  res.end(`Goodbye, ${firstName}!`);
  req.session = null;
});

router.get("/me", errorIfUnauthorized, (req, res) => {
  res.json(req.session.user);
});

module.exports = router;