const prisma = require("../provider/client");

async function getSeminar(req, res) {
    try {
        const data = await prisma.user_seminars.findMany({
            select: {
                user_id: true,
                user: {
                    select: {
                        user_fullname: true,
                    },
                },
                ticket_uuid: true,
                present: true,
                ig_story: true,
            },

        });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

async function checkIn(req, res) {
    try {
        const ticket_Uuid = req.body.ticket_uuid;
        const data = await prisma.user_seminars.findUnique({
            where: {ticket_uuid: ticket_Uuid}
        });
        if (!data) {
            return res.status(404).json({error: 'Ticket not found'});
        }
        if (data.present === true) {
            return res.status(200).json({message: 'You have already checked in'});
        }
        await prisma.user_seminars.update({
            where: {ticket_uuid: ticket_Uuid},
            data: {present: true}
        });
        return res.status(200).json({message: 'Check-in successful'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

async function getCheckIn(req , res){
    try {
        const data = await prisma.user_seminars.findMany({
            select: {
                user_id: true,
                user: {
                    select: {
                        user_fullname: true,
                        user_email: true,
                    },
                },
                ticket_uuid: true,
                present: true,
                ig_story: true,
            },
            where:{
                present: true,
            }

        });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}
module.exports = {getSeminar, checkIn, getCheckIn}