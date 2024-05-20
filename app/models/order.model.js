const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require("../configDB")

const Order = sequelize.define("Order", {

    order_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nameBuyer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    purchaseNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orderDescription: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unitPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },

    orderTable: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync().then(() => {
    console.log('Orders table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

module.exports = Order;