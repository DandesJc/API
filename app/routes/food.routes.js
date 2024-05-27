const express = require('express');
const router = express.Router();
const {
    createFood,
    getFood,
    updateFood,
    deleteFood
} = require('../controller/food.controller');

router.post('/createFood', createFood);
router.get('/getFood', getFood);
router.put('/updateFood', updateFood);
router.delete('/deleleFood', deleteFood);

module.exports = router;
