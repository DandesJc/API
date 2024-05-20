const express = require("express");
const router = express.Router();
const order = require('../controller/order.controller');
//const { route } = require('./index.routes');

//router.get("/seeOrders", order.createOrder(req, res));

router.post("/createOrder", (req, res) => {
    order.createOrder(req, res)
});

// router.put("/updateOrder", order.createOrder(req, res));

// router.delete("/deleteOrder", order.createOrder(req, res));

module.exports = router;