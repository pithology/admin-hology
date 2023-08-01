const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.PRIVATE_KEY, (err, admin) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.adminId = admin.admin_id;
        next();
    });
}

module.exports = authenticateToken;
