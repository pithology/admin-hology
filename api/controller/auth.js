const prisma = require('../provider/client')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
    const {admin_email, admin_password} = req.body;

    try {
        const admin = await prisma.admins.findUnique({where: {admin_email}});

        if (!admin) return res.status(404).json({message: 'Admin not found'});

        const isPasswordValid = await bcrypt.compare(admin_password, admin.admin_password);
        if (!isPasswordValid) return res.status(401).json({message: 'Invalid password'});

        const token = jwt.sign({admin_id: admin.admin_id}, process.env.PRIVATE_KEY, {
            expiresIn: '1h',
        });

        const data = {
            admin_id: admin.admin_id,
            admin_uuid: admin.admin_uuid,
            admin_email: admin.admin_email,
            admin_name: admin.admin_name,
            admin_role: admin.admin_role,
        }
        const response = {
            message: `Login successful, welcome ${admin.admin_name}`,
            token: token,
            data: data,
        }

        return res.json(response);
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {login};
