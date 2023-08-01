const express = require('express');
const app = express();
const apiRoutes = require('./api/routes');
const PORT = process.env.SERVER_PORT || 5000;

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`API Server running on port ${PORT}`);
});
