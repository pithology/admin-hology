function authorizeRole(allowedRoles) {
    return (req, res, next) => {
        const { admin } = req;
        if (!allowedRoles.includes(admin.admin_role)) {
            return res.status(403).json({ message: 'Unauthorized - Insufficient role' });
        }
        next();
    };
}

module.exports = authorizeRole;
