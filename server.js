const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config()

const connectDB = require('./config/db');
const authRoute = require('./route/authRoute');
const productsRoute = require('./route/productRoute');
const cartRoute = require('./route/cartRoute')

const app = express();

const PORT = process.env.APP_PORT || 8000

app.use(cors())
app.use(cookieParser())
app.use(express.json())

connectDB()

app.use('/api/auth', authRoute)
app.use('/api/products', productsRoute)
app.use('/api/cart', cartRoute)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
