const prisma = require("../provider/client");

async function getUser(req, res) {
    try {
        const data = await prisma.users.findMany({
            select: {
                user_id: true,
                user_uuid: true,
                user_fullname: true,
                user_email: true,
                user_gender: true,
                user_birthdate: true,
                institution: true,
                provinsi: {
                    select: {
                        provinsi_name: true,
                    },
                },
            },
        });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

async function getDetail(req, res) {
    try {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return res.status(400).json({error: 'Invalid userId provided'});
        }
        const data = await prisma.users.findUnique({
            where: {
                user_id: userId,
            }, select: {
                user_id: true,
                user_uuid: true,
                user_fullname: true,
                user_email: true,
                user_birthdate: true,
                user_gender: true,
                provinsi_id: true,
                forgot_password_token: true,
                created_at: true,
                updated_at: true,
                institution: true,
                email_verified_token: true,
                no_handphone: true,
                provinsi: {
                    select: {
                        provinsi_id: true, provinsi_name: true,
                    },
                },
            },
        });
        if (!data) {
            return res.status(404).json({message: 'User data not found, please check your request'})
        }
        const userSeminars = await prisma.user_seminars.findFirst({
            where: {
                user_id: userId,
            }, select: {
                ticket_uuid: true, present: true, ig_story: true,
            },
        });
        const detailTeams = await prisma.detail_teams.findMany({
            where: {
                user_id: userId,
            }, select: {
                team_id: true, teams: {
                    select: {
                        team_name: true, competitions: {
                            select: {
                                competition_name: true,
                            },
                        },
                    },
                },
            },
        });
        const response = {
            ...data, user_seminars: userSeminars, detail_teams: detailTeams,
        };
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

async function verifyUser(req, res) {
    try {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return res.status(400).json({error: 'Invalid userId provided'});
        }
        const user = await prisma.users.findFirst({
            where: {
                user_id: userId,
            },
        });
        if (!user) {
            return res.status(404).json({message: 'User data not found, please check your request'})
        }
        await prisma.users.update({
            where: {
                user_id: userId,
            }, data: {
                email_verified_token: 'verified',
            },
        });
        return res.status(200).json({message: 'Verification process completed. The user has been successfully verified.'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

module.exports = {getUser, getDetail, verifyUser}