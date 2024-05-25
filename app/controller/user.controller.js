const Sequelize = require("sequelize");
const user = require("../models/user.model");

const createUser = async (req, res) => {
    try{
        user.create({
            username: req.body.user,
            password: req.body.password,
            Role: req.body.role,
            }).then(user => res.status(200).send({"User Details": user}))
        .catch(error => res.status(400).send({"Error Details":error}))
    }
    catch(e) {
        res.status(500).send(JSON.stringify(e.message))
    }
};

const seeUser = async (req, res) => {
    try {
        const users = await user.findAll()
        .then(user => {
            return res.status(200).send(user);
        })
        .catch(error => {
            return res.status(200).send(error);
        });
    }catch(e) {
        res.status(500).send(e.message)
    } 
}

const deleteUser = async (req, res) => {
    try{
        console.log(req.body.user_id)
        const users = await user.findByPk(req.body.user_id)
        console.log(users)
        if(users) {
            user.destroy({where: {user_id: users.user_id}}).tj
        }


    //     .then(user => {),
    //     res.status(200).send({"User Details": user})}
    // ).catch(error => error.message)
    }
    catch(e) {
        res.status(500).send(JSON.stringify(e.message))
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.body.user_id;
        const updatedData = {
            username: req.body.user,
            password: req.body.password,
            Role: req.body.role,
        };

        const updated = await user.update(updatedData, {
            where: { user_id: userId }
        });

        if (updated) {
            const updatedUser = await user.findByPk(userId);
            res.status(200).send({ "User Details": updatedUser });
        } else {
            res.status(404).send({ "Error Details": "User not found" });
        }
    } catch (error) {
        res.status(500).send({ "Error Details": error.message });
    }
};


module.exports = {
    createUser,
    seeUser,
    deleteUser,
    updateUser
}