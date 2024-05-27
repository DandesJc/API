const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de usuario
app.use(userRoutes);

// Rutas para servir archivos estáticos (CSS, JS)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rutas para servir vistas HTML
app.get('/createUser', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/createUser.html'));
});
app.get('/updateUser', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/updateUser.html'));
});
app.get('/deleteUser', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/deleteUser.html'));
});
app.get('/getUsers', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/getUsers.html'));
});
app.get('/loginUser', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/loginUser.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
