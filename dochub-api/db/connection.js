const {Sequelize} = require("sequelize");
const sequelize = new Sequelize(`sqlite:${process.env.DBFILE}`);
const User = require('./User');

return sequelize.authenticate()
    .then(result => {
        console.log(`SQLite successfully connected!`);
        return User.sync();
    })
    .catch(error => {
        console.error('Unable to connect to SQLite database:', error);
    })
