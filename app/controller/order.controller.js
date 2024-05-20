const Sequelize = require("sequelize");
const order = require("../models/order.model");

const createOrder = async (req, res) => {
    order.create({
        nameBuyer: req.body.nameBuyer,
        purchaseNumber: req.body.purchaseNumber,
        orderDescription: req.body.orderDescription,
        unitPrice: req.body.unitPrice,
        orderTable: req.body.orderTable
    }).then(order => res.status(200).send({"Order Details": order}))
    .catch(error => res.status(400).send({"Error Details":error}))
}


module.exports = createOrder;