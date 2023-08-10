const express = require('express');
const app = express();
const apiRoutes = require('./api/routes');
const seedAdmins = require('./api/seed');
const PORT = process.env.SERVER_PORT || 5000;

app.use(express.json());
const allowedOrigins = ['https://hology6-client.vercel.app', 'http://localhost:5173', 'https://hology.ub.ac.id', 'https://hology-admin.vercel.app',];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`API Server running on port ${PORT}`);
    seedAdmins().then();
});
