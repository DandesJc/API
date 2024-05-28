const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const Role = require('../models/role.model');

const createRole = async (req, res) => {
    try {
        const role = await Role.create({
            role_name: req.body.role_name,
        }).then(()=> {
            res.status(200).send("Role successfully create")
        })
        .catch(res.status(400).send({ message: 'Role Error', role: role}));
        
    } catch (error) {
        res.status(500).send({ 'Error Details': error.message });
    }
};

const getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).send(roles);
    } 
    catch (error) {
        res.status(500).send({ 'Error Details': error.message });
    }
};

const updateRole = async (req, res) => {
    try {
        const roleId = req.body.role_id;
        const updatedData = {
            role_name: req.body.role_name
        };

        const updated = await Role.update(updatedData, {
            where: { id: roleId }
        });

        if (updated[0] > 0) {
            const updatedRole = await Role.findByPk(roleId);
            res.status(200).send({ 'User Details': updatedRole });
        } else {
            res.status(404).send({ 'Error Details': 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ 'Error Details': error.message });
    }
};

const deleteRole = async (req, res) => {
    try {
        const roleId = req.body.role_id;
        const role = await Role.findByPk(roleId);

        if (role) {
            await Role.destroy({ where: { id: roleId } })
            .then(res.status(200).send({ 'User Successfully Deleted': role }))
            .catch(res.status(400).send({ 'Role Error': role}))
        } else {
            res.status(404).send({ 'Error Details': 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ 'Error Details': error.message });
    }
};


module.exports = {
    createRole,
    getRoles,
    updateRole,
    deleteRole,
};
