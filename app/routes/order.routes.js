const express = require("express");
const router = express.Router();
const order = require('../controller/order.controller');
//const { route } = require('./index.routes');

router.post("/createOrder", (req, res) => {
    order.createOrder(req, res)
});

router.get("/getOrder", (req, res) => order.getOrder(req, res));

router.put("/updateOrder", (req, res) => order.updateOrder(req, res));

router.delete("/deleteOrder", (req, res) => order.deleteOrder(req, res));

module.exports = router;