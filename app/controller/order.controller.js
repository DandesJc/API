const Sequelize = require("sequelize");
const order = require("../models/order.model");
const orderFood = require ("../models/ManyToMany/OrderFoods.models")

const orderFoodsRelationship = (req, res) => {
    try {
        orderFood.create({
            OrderOrderId: req.body.order_id,
            FoodFoodId: req.body.food_id,
            quantity: req.body.quantity
        }).then(result => res.status(400).send({"Order Details": result}))
        .catch(error => res.status(400).send({"Error Details":error}));
    }catch(e) {
        console.log(e.message);
    }
}

const createOrder = async (req, res) => {
    try {
        order.create({
            nameBuyer: req.body.nameBuyer,
            purchaseNumber: req.body.purchaseNumber,
            orderDescription: req.body.orderDescription,
            orderTable: req.body.orderTable,
        }).then((req, res) => {
            return orderFoodsRelationship(req, res)
        })
        .catch(error => res.status(400).send({"Error Details":error}))
    }catch(e) {
        console.log(e.message)
    };
}


const getOrder = async (req, res) => {
    try {
        await orderFood.findAll()
        .then(orderFood => {
            return res.status(200).send(orderFood);
        })
        .catch(error => {
            return res.status(200).send(error);
        });
    }catch(e) {
        res.status(500).send(e.message)
    } 
}

const updateOrder = async (req, res) => {
    try {
        const orderId = req.body.order_id;
        const updatedData = {
            FoodFoodId: req.body.FoodFoodId
        };

        const updated = await orderFood.update(updatedData, {
            where: { order_id: orderId }
        });

        if (updated) {
            const updatedOrder = await order.findByPk(orderId);
            res.status(200).send({ "Order Details": updatedOrder });
        } else {
            res.status(404).send({ "Error Details": "Order not found" });
        }
    } catch (error) {
        res.status(500).send({ "Error Details": error.message });
    }
};


const deleteOrder = async (req, res) => {
    try{
        
        console.log(req.body.order_id);

        const orderFoodResult = await orderFood.findByPk(req.body.order_id);
        
        console.log(orderFoodResult);

        if(orderFoodResult) {
            orderFood.destroy({where: {order_id: orderFoodResult.order_id}})
            .then(orderFoodResult => {
                res.status(200).send({"Order Succesfully Deleted": orderFoodResult})
            }).catch(error => error.message)
        }
    }
    catch(e) {
        res.status(500).send(e.message)
    }
};


module.exports = {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder
};