const order = require("./order.model");
const food = require("./food.model");
const user = require("./user.model")
const role = require("./role.model")

//------------------------Many to Many Relationships--------------------------
const orderFoods = require("./ManyToMany/OrderFoods.models");
const userRoles = require("./ManyToMany/UserRoles.models");
//----------------------------------------------------------------------------

order.belongsToMany(food, {through: orderFoods});
food.belongsToMany(order, {through: orderFoods});


user.belongsToMany(role, {through: userRoles});
role.belongsToMany(user, {through: userRoles});
