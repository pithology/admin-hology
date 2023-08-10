const express = require('express');
const router = express.Router();
const login = require('./controller/auth');
const dashboard = require('./controller/dashboard');
const competition = require('./controller/competition');
const seminar = require('./controller/seminar');
const user = require('./controller/user');
const management = require('./controller/management');
const authenticateToken = require('./middleware/authenticateToken');
const prisma = require("./provider/client");

router.post('/login', login.login);
router.post('/changePassword', authenticateToken, login.changePassword);

router.get('/dashboard', dashboard.dashboard);
router.get('/recent', dashboard.getLatestCompetitions);

router.get('/user', user.getUser);
router.get('/user/detail/:userId', user.getDetail);
router.post('/user/verify/:userId', authenticateToken, user.verifyUser);

router.get('/competition', competition.getCompetition);
router.get('/competition/:competitionId', competition.getCompetitionDetail);
router.get('/competition/detail/:teamId', competition.getDetail);
router.post('/competition/statusphase/:teamId', authenticateToken, competition.updateTeamStatusAndPhase);
router.post('/competition/announcement/:teamId', authenticateToken, competition.setOrUpdateAnnouncement);

router.get('/seminar', seminar.getSeminar);
router.get('/seminar/history', seminar.getCheckIn)
router.post('/seminar/checkin', authenticateToken, seminar.checkIn);

router.get('/admin', authenticateToken, management.getAdmin);
router.post('/admin/create', authenticateToken, management.createAdmin);
router.post('/admin/edit/:Id', authenticateToken, management.editAdmin);
router.post('/admin/compe/:Id', authenticateToken, management.editCompe);

router.get('/status', async (req, res) => {
    try {
        await prisma.admins.findFirst();
        res.json({message: 'Server is running well!'});
    } catch (error) {
        res.status(500).json({error: 'Database connection error!', message: error.message});
    }
});

module.exports = router;
