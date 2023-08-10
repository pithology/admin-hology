const prisma = require("../provider/client");
const bcrypt = require("bcrypt");

async function getAdmin(req, res) {
    try {
        const check = await prisma.admins.findFirst({
            where: {admin_id: req.adminId}
        });
        if (!check || check.admin_role !== 'GOD') {
            return res.status(403).json({message: 'Access denied!'});
        }
        const data = await prisma.admins.findMany({
            where: {
                NOT: {
                    admin_role: 'GOD'
                }
            }
        });
        const response = [check, ...data];
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

async function createAdmin(req, res) {
    const {admin_email, admin_name, admin_password, admin_role} = req.body;
    try {
        const check = await prisma.admins.findFirst({
            where: {admin_id: req.adminId}, select: {admin_role: true}
        });
        if (!check || check.admin_role !== 'GOD') {
            return res.status(403).json({message: 'Access denied!'});
        }
        const hashedPassword = await bcrypt.hash(admin_password, 10);
        const createdAdmin = await prisma.admins.create({
            data: {
                admin_email, admin_name, admin_password: hashedPassword, admin_role
            }
        });
        return res.status(201).json(createdAdmin);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

async function editAdmin(req, res) {
    const {admin_email, admin_name, admin_role} = req.body;
    const {Id} = req.params;
    try {
        const check = await prisma.admins.findFirst({
            where: {admin_id: req.adminId}, select: {admin_role: true}
        });
        if (!check || check.admin_role !== 'GOD') {
            return res.status(403).json({message: 'Access denied!'});
        }
        if (isNaN(Id)) {
            return res.status(400).json({error: 'Invalid Id provided'});
        }
        const updatedAdmin = await prisma.admins.update({
            where: {admin_id: parseInt(Id)}, data: {
                admin_email, admin_name, admin_role
            }
        });
        return res.status(200).json(updatedAdmin);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

async function editCompe(req, res) {
    const {competition_name, competition_description} = req.body;
    const {Id} = req.params;
    try {
        const check = await prisma.admins.findFirst({
            where: {admin_id: req.adminId}, select: {admin_role: true}
        });
        if (!check || check.admin_role !== 'GOD') {
            return res.status(403).json({message: 'Access denied!'});
        }
        if (isNaN(Id)) {
            return res.status(400).json({error: 'Invalid Id provided'});
        }
        const updateCompe = await prisma.competitions.update({
            where: {competition_id: parseInt(Id)}, data: {
                competition_name, competition_description
            }
        });
        return res.status(200).json(updateCompe);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}


module.exports = {
    getAdmin,
    editAdmin,
    createAdmin,
    editCompe
}