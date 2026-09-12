const express = require('express');

const router = express.Router();

const userController = require('../controller/userController');

router.post('/user/add-user', userController.addUser);

router.get('/user/get-users', userController.getUsers);

router.delete('/user/delete-user/:id', userController.deleteUser);

module.exports = router;