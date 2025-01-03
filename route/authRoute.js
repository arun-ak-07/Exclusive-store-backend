const express = require('express');
const { signUp, signIn, signOut } = require('../controller/authController');

const route = express.Router();

route.post('/signUp', signUp)
route.post('/signIn', signIn)
route.post('/signOut', signOut)

module.exports = route;