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
  })
  .then(() => {
    console.log(`Done creating users`);
  });

const Document = require('../db/Document');
Document.sync({force: true});

const categories = require('../modules/categories');
const Category = require('../db/Category');
Category.sync({force: true})
  .then(() => {
    return Category.create({name: "Audio"});
  })
  .then(() => {
    return Category.create({name: "Lighting"});
  })
  .then(() => {
    console.log(`Done creating categories`);
  });
