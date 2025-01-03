const express = require('express');
const { addItem, getCart, removeItem } = require('../controller/cartController');
const authMiddleware = require('../middleware/authMiddleware')

const route = express.Router();

route.put('/addItem', authMiddleware,addItem)
route.get('/getCart', authMiddleware,getCart)
route.delete('/removeItem', authMiddleware,removeItem)

module.exports = route;