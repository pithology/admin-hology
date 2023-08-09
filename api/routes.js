const express = require('express');
const router = express.Router();
const login = require('./controller/auth');
const dashboard = require('./controller/dashboard');
const competition = require('./controller/competition');
const seminar = require('./controller/seminar');
const authenticateToken = require('./middleware/authenticateToken');
const authorizeRole = require("./middleware/authorizeRole");
const prisma = require("./provider/client");

const protectedRoutes = [
    {path: '/management', allowedRoles: ['GOD']},
];

router.use((req, res, next) => {
    if (protectedRoutes.some((route) => route.path === req.url)) {
        authenticateToken(req, res, () => {
            const allowedRoles = protectedRoutes.find((route) => route.path === req.url).allowedRoles;
            authorizeRole(allowedRoles)(req, res, next);
        });
    } else next();
});

router.post('/login', login.login);
router.post('/changePassword', authenticateToken, login.changePassword);

router.get('/dashboard', dashboard.dashboard);
router.get('/recent', dashboard.getLatestCompetitions);

router.get('/competition', competition.getCompetition);
router.get('/competition/:competitionId', competition.getCompetitionDetail);
router.get('/competition/detail/:teamId', competition.getDetail);
router.post('/competition/statusphase/:teamId', authenticateToken, competition.updateTeamStatusAndPhase);
router.post('/competition/announcement/:teamId', authenticateToken, competition.setOrUpdateAnnouncement);

router.get('/seminar', seminar.getSeminar);
router.get('/seminar/history', seminar.getCheckIn)
router.post('/seminar/checkin', authenticateToken, seminar.checkIn);

router.get('/status', async (req, res) => {
    try {
        await prisma.admins.findFirst();
        res.json({message: 'Server is running well!'});
    } catch (error) {
        res.status(500).json({error: 'Database connection error!', message: error.message});
    }
});

module.exports = router;
