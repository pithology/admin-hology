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

module.exports = {getSeminar}