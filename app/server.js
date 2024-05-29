'use strict'

const express = require('express')
const app = express()
const router =  require("./routes/index.routes")
const bodyParser = require("body-parser")
const sequelize = require('./configDB')

const models = require('./models/index.model');

const port = process.env.PORT || 8080;

// Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router);

// Synchronize sequelize models
sequelize.sync().then(() => {
    console.log('Database synchronized');
}).catch(err => {
    console.error('Error synchronizing database:', err);
});

// Define routes
app.get('/', (req, res) => {
    console.log("Request body:", req.body);
    res.json({ mensaje: "Server is up!" });
});

// Start the server
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});

module.exports = app;