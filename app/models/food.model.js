const {DataTypes} = require('sequelize')
const sequelize = require("../configDB");


const Food = sequelize.define("Foods", {

    food_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    food_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    food_description: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    food_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
});

sequelize.sync().then(() => {
    console.log('Foods table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

module.exports = Food;