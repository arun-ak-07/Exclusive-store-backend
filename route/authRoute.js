const express = require('express');
const { signUp, signIn } = require('../controller/authController');

const route = express.Router();

route.post('/signUp', signUp)
route.post('/signIn', signIn)

module.exports = route;