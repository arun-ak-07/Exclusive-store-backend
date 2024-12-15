const mongoose = require('mongoose');

const connectDB = async (req, res) => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log(`DB connection established`)
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB;