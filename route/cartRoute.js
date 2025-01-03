const express = require('express');
const { addItem, getCart } = require('../controller/cartController');

const route = express.Router();

route.put('/addItem', addItem)
route.get('/getCart', getCart)

module.exports = route;