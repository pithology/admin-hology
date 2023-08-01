const prisma = require('../provider/client');

async function dashboard(req, res) {
    try {
        const totalUsers = await prisma.users.count();
        const totalSeminars = await prisma.user_seminars.count();
        const totalUiUx = await prisma.teams.count({
            where: {
                competitions: {
                    competition_name: 'UI/UX Design',
                },
            },
        });

        const totalItBusinessCase = await prisma.teams.count({
            where: {
                competitions: {
                    competition_name: 'IT Business Case',
                },
            },
        });

        const totalCaptureTheFlag = await prisma.teams.count({
            where: {
                competitions: {
                    competition_name: 'Capture the Flag',
                },
            },
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const totalIncrease = await prisma.users.count({
            where: {
                created_at: {
                    gte: today,
                },
            },
        });
        const totalActivity = totalSeminars + totalUiUx + totalItBusinessCase + totalCaptureTheFlag;
        const data = {
            user: totalUsers || 0,
            increase: totalIncrease || 0,
            activity: totalActivity || 0,
            seminar: totalSeminars || 0,
            totalUiUx,
            totalItBusinessCase,
            totalCaptureTheFlag,
        };
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Internal server error'});
    }
}

async function getLatestCompetitions(req, res) {
    try {
        const limit = 5;
        const latestCompetitions = await prisma.competitions.findMany({
            orderBy: {
                competition_id: 'desc',
            },
            take: limit,
            include: {
                teams: {
                    select: {
                        team_id: true,
                        team_name: true,
                        team_status: true,
                        team_lead_id: true,
                        team_leader: {
                            select: {
                                user_fullname: true,
                            },
                        },
                        join_token: true,
                    },
                },
            },
        });

        const totalData = await prisma.teams.count();
        const totalShown = totalData >= 5 ? 5 : totalData;

        const data = {
            competitions: latestCompetitions,
            totalShown,
            totalData,
        };

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

module.exports = {dashboard, getLatestCompetitions};
