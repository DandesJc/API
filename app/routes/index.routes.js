const router = require('express').Router();

const order = require('./order.routes');
const food = require('./food.routes');
const user = require('./user.routes');


router.use('/order', order);
router.use('/food', food);
router.use('/user', user);


router.get('/', function(req, res) {
    res.status(200).json({message: 'Estás conectado a nuesta API'})
});

module.exports = router;
