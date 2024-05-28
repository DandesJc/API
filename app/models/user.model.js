const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require("../configDB")

const User = sequelize.define("Users", {
    user_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

sequelize.sync().then(() => {
    console.log('Orders table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

module.exports = User;