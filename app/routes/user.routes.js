const express = require('express');
const router = express.Router();
const { createUser, getUsers, updateUser, deleteUser, loginUser } 
= require('../controller/user.controller');
//const authenticateToken = require('../middleware/authenticateToken');

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/users', getUsers);
router.put('/updateUser', updateUser);
router.delete('/deleteUser', deleteUser);

module.exports = router;
