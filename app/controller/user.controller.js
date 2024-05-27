const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const userRole = require("../models/ManyToMany/UserRoles.models")

const userRolesRelationship = async (req, res) => {
    try {
        await userRole.create({
            UserUserId: req.body.user_id,
            RoleRoleId: req.body.role_id,

        }).then(result => res.status(200).send({"User succesfully create": result}))
        .catch(error => res.status(400).send({"Error Details":error}));
    }catch(e) {
        console.log(e.message);
    }
}

const createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            lastname: req.body.lastname,
            username: req.body.username,
            password: hashedPassword,
        }).then(await userRolesRelationship(req, res))
        .catch(res.status(400).send({ message: 'User Error', user}));
        
    } catch (error) {
        res.status(500).send({ 'Error Details': error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } 
    catch (error) {
        res.status(500).send({ 'Error Details': error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.body.user_id;
        const updatedData = {
            username: req.body.username,
            email: req.body.email,
        };

        if (req.body.password) {
            updatedData.password = await bcrypt.hash(req.body.password, 10);
        }

        const updated = await User.update(updatedData, {
            where: { id: userId }
        });

        if (updated[0] > 0) {
            const updatedUser = await User.findByPk(userId);
            res.status(200).send({ 'User Details': updatedUser });
        } else {
            res.status(404).send({ 'Error Details': 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ 'Error Details': error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.body.user_id;
        const user = await User.findByPk(userId);

        if (user) {
            await User.destroy({ where: { id: userId } })
            .then(res.status(200).send({ 'User Successfully Deleted': user }))
            .catch(res.status(400).send({ 'User Error': user}))
        } else {
            res.status(404).send({ 'Error Details': 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ 'Error Details': error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });
        if (!user) {
            return res.status(401).send({ 'Error Details': 'Invalid username or password' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send({ 'Error Details': 'Invalid username or password' });
        }

        //const token = jwt.sign({ id: user.id }, 'your_jwt_secret_key', { expiresIn: '1h' });
        res.status(200).send({ message: 'Login successful'});
    } catch (error) {
        res.status(500).send({ 'Error Details': error.message });
    }
};

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    loginUser
};
