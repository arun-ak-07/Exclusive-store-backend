const express = require('express');
const { addItem, getCart, removeItem } = require('../controller/cartController');

const route = express.Router();

route.put('/addItem', addItem)
route.get('/getCart', getCart)
route.delete('/removeItem', removeItem)

module.exports = route;