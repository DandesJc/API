const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("restaurant", "root","", {
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: 0
});

sequelize.authenticate().then(function() {
    console.log("success");
}).catch(function(error) {
    console.log("error: " + error);
});


module.exports = sequelize;