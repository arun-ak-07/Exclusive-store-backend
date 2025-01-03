const jwt = require('jsonwebtoken');

const userMiddleware = (req, res, next) => {
    const token = req.cookies.token;  

    if (!token) {
        return res.status(401).json({ message: 'Access Denied, Token Missing!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  
        next();  
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or Expired Token!' });
    }
};

module.exports = userMiddleware;