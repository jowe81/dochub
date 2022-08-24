require('dotenv').config();
require('../db/connection');


const User = require('../db/User');
User.sync({force: true});