const Sequelize = require("sequelize");
const order = require("../models/order.model");
const orderFood = require ("../models/ManyToMany/OrderFoods.models")

const orderFoodsRelationship = async (req, res) => {
    try {
        const orderId = await order.findOne({where: {
            buyer_name: req.body.nameBuyer
        }})
        await orderFood.create({
            OrderOrderId: orderId.order_id,
            FoodFoodId: req.body.food_id,
            quantity: req.body.quantity,
            total_price: req.body.total_price
        })
        res.status(200).send(ok)
    }catch(e) {
        res.status(200).send(e.message)

    }
}

const createOrder = async (req, res) => {
    try {
        console.log(req.body)
        order.create({
            buyer_name: req.body.nameBuyer,
            purchase_number: req.body.purchaseNumber,
            order_description: req.body.orderDescription,
            order_table: req.body.orderTable,
        }).then(() => {
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


const getUserOrder = async (req, res) => {
    try {
        //console.log(req.body)
        const OrderIds = [];
        const orderResult = await order.findAll({
            where: {buyer_name: req.body.nameBuyer}
        });
        
        if(orderResult && orderResult.length >= 1) {
            console.log('Ingresa')
            for (let data in orderResult) {
                let result = await orderFood.findOne(data.order_id, {where: {OrderOrderId: data.order_id}})
                OrderIds.push(result);
            }
            console.log('OrderResult if', orderResult)
        }
        //console.log('OrderResult', orderResult.order_id)
        return res.status(200).send(OrderIds)
        
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
    deleteOrder,
    getUserOrder
};