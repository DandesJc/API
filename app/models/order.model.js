const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require("../configDB");

const Order = sequelize.define("Orders", {

    order_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    buyer_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    purchase_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    order_table: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

sequelize.sync().then(() => {
    console.log('Orders table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

module.exports = Order;