const express = require('express');
const { userController } = require('../controllers');
const { authoriser } = require('../middlewares');

const userRoutes = express.Router({});

// userRoutes.get('/', userController.getList);
userRoutes.post('/', userController.signUp);
userRoutes.post('/sign-in', userController.signIn);
userRoutes.post('/sign-out', authoriser, userController.signOut);
// userRoutes.get('/count', userController.getListCount);
userRoutes.get('/', authoriser, userController.getOne);
userRoutes.put('/', authoriser, userController.updateOne);
userRoutes.put('/passwords', authoriser, userController.changePassword);
// // noteRoutes.delete('/:userId/', userController.deleteOne);

module.exports = userRoutes;
