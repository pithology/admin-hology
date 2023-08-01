const prisma = require("../provider/client");

async function getCaptureTheFlag(req, res) {
    try {
        const data = await prisma.teams.findMany({
            where: {
                competitions: {
                    competition_name: 'Capture the Flag',
                },
            },
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
                phase: true,
            },

        });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

async function getUIUXDesign(req, res) {
    try {
        const data = await prisma.teams.findMany({
            where: {
                competitions: {
                    competition_name: 'UI/UX Design',
                },
            },
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
                phase: true,
            },

        });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

async function getITBusinessCase(req, res) {
    try {
        const data = await prisma.teams.findMany({
            where: {
                competitions: {
                    competition_name: 'IT Business Case',
                },
            },
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
                phase: true,
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
        const teamId = parseInt(req.params.teamId);
        if (isNaN(teamId)) {
            return res.status(400).json({error: 'Invalid teamId provided'});
        }
        const data = await prisma.teams.findUnique({
            where: {team_id: teamId},
            include: {
                team_leader: {
                    select: {
                        user_fullname: true
                    }
                },
                detail_teams: {
                    include: {
                        users: {
                            select: {
                                user_id: true,
                                user_fullname: true,
                            }
                        }
                    }
                },
                team_payment_proof: true,
                pengumuman: true,
                competitions: true,
            }
        });

        if (!data) {
            return res.status(404).json({error: 'Team not found'});
        }

        const memberUserIds = data.detail_teams
            .filter((detail) => detail.user_id !== data.team_lead_id)
            .map((detail) => detail.user_id);
        const members = await prisma.users.findMany({
            where: {
                user_id: {
                    in: memberUserIds,
                },
            },
            select: {
                user_fullname: true,
            },
        });
        const member1 = members[0]?.user_fullname || '';
        const member2 = members[1]?.user_fullname || '';

        const response = {
            team_id: data.team_id,
            team_name: data.team_name,
            leader_name: data.team_leader?.user_fullname || '',
            member_1: member1,
            member_2: member2,
            team_biodata: data.team_biodata || '',
            institution: data.institution || '',
            join_token: data.join_token,
            status: data.team_status,
            phase: data.phase,
            competition: data.competitions?.competition_name || '',
            nama_rekening: data.team_payment_proof?.nama_rekening || '',
            no_rekening: data.team_payment_proof?.no_rekening || '',
            payment_proof: data.team_payment_proof?.payment_proof || '',
            judul: data.pengumuman?.judul || '',
            deskripsi: data.pengumuman?.deskripsi || ''
        };
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

async function setOrUpdateAnnouncement(req, res) {
    try {
        const {teamId} = req.params;
        const {judul, deskripsi} = req.body;
        const existingTeam = await prisma.teams.findUnique({
            where: {team_id: parseInt(teamId)},
        });
        if (!existingTeam) {
            return res.status(404).json({error: 'Team not found'});
        }
        let existingAnnouncement = await prisma.pengumuman.findUnique({
            where: {team_id: parseInt(teamId)},
        });
        if (existingAnnouncement) {
            existingAnnouncement = await prisma.pengumuman.update({
                where: {team_id: parseInt(teamId)},
                data: {
                    judul: judul,
                    deskripsi: deskripsi,
                },
            });
        } else {
            existingAnnouncement = await prisma.pengumuman.create({
                data: {
                    team_id: parseInt(teamId),
                    judul: judul,
                    deskripsi: deskripsi,
                },
            });
        }
        return res.status(200).json(existingAnnouncement);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

async function updateTeamStatusAndPhase(req, res) {
    try {
        const {teamId} = req.params;
        const {status, phase} = req.body;
        const existingTeam = await prisma.teams.findUnique({
            where: {team_id: parseInt(teamId)},
        });
        if (!existingTeam) {
            return res.status(404).json({error: 'Team not found'});
        }
        const updatedTeam = await prisma.teams.update({
            where: {team_id: parseInt(teamId)},
            data: {
                team_status: status,
                phase: phase,
            },
        });
        return res.status(200).json(updatedTeam);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

module.exports = {
    getUIUXDesign,
    getITBusinessCase,
    getCaptureTheFlag,
    getDetail,
    setOrUpdateAnnouncement,
    updateTeamStatusAndPhase
}