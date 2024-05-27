const {DataTypes} = require("sequelize")

const sequelize = require("../../configDB");

const OrderFoods = sequelize.define('OrderFoods', {
  
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
});

  module.exports = OrderFoods;