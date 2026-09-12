const User = require('../models/users');

// Add user
const addUser = async (req, res) => {
    try {
        const {name, phone, email} = req.body;

        const user = await User.create({
            name: name,
            phone: phone,
            email: email
        });

        res.status(201).json({
            message: "User created successfully",
            id: user.id
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            message: "Unable to create user"
        });
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).json(users);

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            message: "Unable to get users"
        });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }

        await user.destroy();

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            message: "Unable to delete user"
        });
    }
};

module.exports = {
    addUser,
    getUsers,
    deleteUser
};