const {Sequelize} = require("sequelize");
const sequelize = new Sequelize(`sqlite:${process.env.DBFILE}`);

return sequelize.authenticate()
    .then(result => {
        console.log(`SQLite successfully connected!`);
    })
    .catch(error => {
        console.error('Unable to connect to SQLite database:', error);
    })
