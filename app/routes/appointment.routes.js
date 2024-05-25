const express = require('express');
const { createAppointment, seeAppointments, updateAppointment, deleteAppointment } = require('../controller/appointment.controller');
const router = express.Router();

router.post('/create-appointment', createAppointment);
router.get('/see-appointments', seeAppointments);
router.put('/update-appointment', updateAppointment);
router.delete('/delete-appointment', deleteAppointment);

module.exports = router;
