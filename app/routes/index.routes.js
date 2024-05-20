const router = require('express').Router();
const order = require('./order.routes');

router.use('/order', order);

router.get('/', function(req, res) {
    res.status(200).json({message: 'Estás conectado a nuesta API'})
});

module.exports = router;
