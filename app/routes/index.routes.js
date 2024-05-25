const router = require('express').Router();
const user = require('./user.routes');
const appointment = require('./appointment.routes');

router.use('/users', user);
router.use('/appointment', appointment);

router.get('/', function(req, res) {
    res.status(200).json({message: 'Estás conectado a nuesta API'})
});

module.exports = router;
