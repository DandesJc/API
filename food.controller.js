const Sequelize = require("sequelize");
const food = require("../models/food.model");

const createFood = async (req, res) => {
    try {
        console.log("///////////",req.body);
        food.create({
            food_name: req.body.food_name,
            food_price: req.body.food_price,
            food_description: req.body.food_description,
        }).then(() => {
            return res.status(200).send({message: `${req.body.food_name} succesfully agregate`});
        })
        .catch(error => res.status(400).send({"Error Details #createFood":error.message}))
    }catch(e) {
        console.log(e.message)
    };
}


const getFood = async (req, res) => {
    try {
        await food.findAll()
        .then(food  => {
            return res.status(200).send(food);
        })
        .catch(error => {
            return res.status(200).send(error);
        });
    }catch(e) {
        res.status(500).send(e.message)
    } 
}

const updateFood = async (req, res) => {
    try {
        const foodId = req.body.food_id;
        const updatedData = {
            food_name: req.body.food_name,
            food_price: req.body.food_price,
            food_description: req.body.food_description,
        };

        const updated = await food.update(updatedData, {
            where: { food_id: foodId }
        });

        if (updated) {
            const updatedFood = await food.findByPk(foodId);
            res.status(200).send({ "Food Details": updatedFood });
        } else {
            res.status(404).send({ "Error Details": "Order not found" });
        }
    } catch (error) {
        res.status(500).send({ "Error Details": error.message });
    }
};


const deleteFood = async (req, res) => {
    try{

        console.log(req.body.food_id);

        const orderFoodResult = await food.findByPk(req.body.food_id);
        
        console.log(orderFoodResult);

        if(orderFoodResult) {
            food.destroy({where: {food_id: orderFoodResult.food_id}})
            .then(orderFoodResult => {
                res.status(200).send({"Food Succesfully Deleted": orderFoodResult})
            }).catch(error => error.message)
        }
    }
    catch(e) {
        res.status(500).send(e.message)
    }
};


module.exports = {
    createFood,
    getFood,
    updateFood,
    deleteFood
};