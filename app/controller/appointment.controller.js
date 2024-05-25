const Appointment = require("../models/appointment.model");

const createAppointment = async (req, res) => {
    try {
        const newAppointment = await Appointment.create({
            pet_name: req.body.pet_name,
            owner_name: req.body.owner_name,
            appointment_date: req.body.appointment_date,
            description: req.body.description
        });
        res.status(200).send({ "Appointment Details": newAppointment });
    } catch (error) {
        res.status(400).send({ "Error Details": error.message });
    }
};

const seeAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.status(200).send(appointments);
    } catch (error) {
        res.status(500).send({ "Error Details": error.message });
    }
};

const updateAppointment = async (req, res) => {
    try {
        const appointmentId = req.body.appointment_id;
        const updatedData = {
            pet_name: req.body.pet_name,
            owner_name: req.body.owner_name,
            appointment_date: req.body.appointment_date,
            description: req.body.description
        };

        const [updated] = await Appointment.update(updatedData, {
            where: { appointment_id: appointmentId }
        });

        if (updated) {
            const updatedAppointment = await Appointment.findByPk(appointmentId);
            res.status(200).send({ "Appointment Details": updatedAppointment });
        } else {
            res.status(404).send({ "Error Details": "Appointment not found" });
        }
    } catch (error) {
        res.status(500).send({ "Error Details": error.message });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const appointmentId = req.body.appointment_id;
        const appointmentToDelete = await Appointment.findByPk(appointmentId);
        if (appointmentToDelete) {
            await Appointment.destroy({ where: { appointment_id: appointmentId } });
            res.status(200).send({ "Message": "Appointment deleted successfully" });
        } else {
            res.status(404).send({ "Error Details": "Appointment not found" });
        }
    } catch (error) {
        res.status(500).send({ "Error Details": error.message });
    }
};

module.exports = {
    createAppointment,
    seeAppointments,
    updateAppointment,
    deleteAppointment
};
