const jwt = require('jsonwebtoken');

const generateTokensAndCookies = (user) => {
    
    const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
    return token;

}

module.exports = generateTokensAndCookies;