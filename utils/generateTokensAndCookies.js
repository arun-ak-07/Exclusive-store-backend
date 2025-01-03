const jwt = require('jsonwebtoken');

const generateTokensAndCookies = (user, res) => {
    
    const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    // Set secure HttpOnly cookie (only accessible by server-side code)
    const cookieOptions = {
        httpOnly: true,  // Ensures the cookie can't be accessed by JavaScript
        secure: process.env.NODE_ENV === 'production',  // Only set cookies over HTTPS in production
        sameSite: 'Strict',  // Helps prevent CSRF attacks
        maxAge: 24 * 60 * 60 * 1000  // Cookie expiry (matches the JWT token expiry)
    };

    res.cookie('token', token, cookieOptions);
    return token;

}

module.exports = generateTokensAndCookies;