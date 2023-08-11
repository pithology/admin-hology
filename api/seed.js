const bcrypt = require('bcrypt');
const prisma = require('./provider/client');

async function seedAdmins() {
    const adminData = [{
        email: 'dev@hology.ub.ac.id', name: 'Rafa', role: 'GOD', password: 'rafaturu'
    }, {
        email: 'pit@hology.ub.ac.id', name: 'PIT', role: 'GOD', password: 'everlasting'
    }, {
        email: 'inti@hology.ub.ac.id', name: 'INTI', role: 'INTI', password: 'intihology6'
    }, {
        email: 'sekben@hology.ub.ac.id', name: 'SEKBEN', role: 'SEKBEN', password: 'sekbenhology6'
    }, {
        email: 'exhibitor@hology.ub.ac.id', name: 'EXHIBITOR', role: 'EXHIBITOR', password: 'exhibitorhology6'
    }, {
        email: 'instructor@hology.ub.ac.id', name: 'INSTRUCTOR', role: 'INSTRUCTOR', password: 'instructorhology6'
    }];
    for (const admin of adminData) {
        const existingAdmin = await prisma.admins.findUnique({
            where: {admin_email: admin.email},
        });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(admin.password, 10);
            await prisma.admins.create({
                data: {
                    admin_email: admin.email,
                    admin_password: hashedPassword,
                    admin_name: admin.name,
                    admin_role: admin.role,
                },
            });
            console.log(`Admin user ${admin.name} seeded.`);
        } else {
            console.log(`Admin user ${admin.name} seed done.`);
        }
    }
}

module.exports = seedAdmins;
