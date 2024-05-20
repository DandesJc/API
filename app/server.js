const express = require('express')
const app = express()
const router =  require("./routes/index.routes")
const bodyParser = require("body-parser")
const sequelize = require('./configDB')
const user = require("./models/order.model")

const port = process.env.PORT || 8080


sequelize.sync().then();

app.get('/', function(req, res) {
    res.json({mensaje: "Server is up!"});
});

app.listen(port)
console.log(`API escuchando en el http://localhost:${port}`)

// router.get('/', function(req, res) {
//     res.json({message: 'Welcome to our API!'})
// })


app.use('/api', router);
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


// router.post('/', function(req, res) {
//     res.json({mensaje: req.body.nombre})
// })