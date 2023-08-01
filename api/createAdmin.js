const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
async function createAdminAccount() {
    try {
        const adminEmail = 'pit@hology.ub.ac.id';
        const existingAdmin = await prisma.admins.findFirst({ where: { admin_email: adminEmail } });

        if (existingAdmin) {
            console.log('Admin account already exists.');
            return;
        }

        const hashedPassword = await bcrypt.hash('everlasting', 10);

        const newAdmin = await prisma.admins.create({
            data: {
                admin_email: adminEmail,
                admin_password: hashedPassword,
                admin_name: 'PIT',
                admin_role: 'GOD',
            },
        });

        console.log('Admin account created:', newAdmin);
    } catch (error) {
        console.error('Error creating admin account:', error);
    } finally {
        await prisma.$disconnect();
    }
}
createAdminAccount().then(() => {});
