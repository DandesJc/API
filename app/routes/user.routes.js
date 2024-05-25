const express = require("express");
const router = express.Router();
const user = require('../controller/user.controller');
//const { route } = require('./index.routes');

router.get("/seeUser", (req, res) => {
    user.seeUser(req, res);
})

router.post("/createUser", (req, res) => {
    user.createUser(req, res)
});


router.delete("/deleteUser", (req, res) => {
    user.deleteUser(req, res)
});

router.put("/updateUser", (req, res) => {
    user.updateUser(req, res)
});


module.exports = router;