const jwt = require('jsonwebtoken');

const userMiddleware = (req, res, next) => {
    const token = req.cookies.token;  

    if (!token) {
        return res.status(401).json({ message: 'Access Denied, Token Missing!' });
    }

    try {
        console.log('Received Token:', token);  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  

        const userId = decoded._id;
        console.log("User ID from token:", userId); 

        next(); 
    } catch (error) {
        console.error('Token verification error:', error); 
        return res.status(403).json({ message: 'Invalid or Expired Token!' });
    }
};

module.exports = userMiddleware;
