const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controller/productController');

const route = express.Router();

route.post('/createProduct', createProduct)
route.put('/updateProduct/:productId', updateProduct)
route.delete('/deleteProduct/:productId', deleteProduct)
route.get('/getProducts', getProducts)

module.exports = route;