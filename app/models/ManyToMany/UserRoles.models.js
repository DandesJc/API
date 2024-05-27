const sequelize = require("../../configDB");

const UserRole = sequelize.define("UserRoles", {

});

sequelize.sync().then(() => {
    console.log('Orders table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

module.exports = UserRole;