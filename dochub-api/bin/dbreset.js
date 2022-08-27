require('dotenv').config();
require('../db/connection');

const users = require('../modules/users');
const User = require('../db/User');
User.sync({force: true})
  .then(() => {
    return users.create({name: "Johannes", email: "johannes@drweber.de", plaintextPassword: "12345" });
  })
  .then(() => {
    return users.create({name: "Jess", email: "jess@drweber.de", plaintextPassword: "12345" });
  });
const Document = require('../db/Document');
Document.sync({force: true});