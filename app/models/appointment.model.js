const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require("../configDB")

const appointment = sequelize.define("Appointment", {
    appointment_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pet_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    appointment_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'appointments' // Asegúrate de que este sea el nombre correcto de tu tabla
});

sequelize.sync().then(() => {
    console.log('Appointment table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = appointment;
