const express = require('express');
const path = require("path");

const mergeRoutes = require('./routes/merge')
const cors = require("cors");
// const helmet = require("helmet");

const app = express();
app.listen(process.env.PORT || 8888);

app.use(express.urlencoded({extended: true}));
app.use(cors());
// app.use(helmet());
app.use('/api', mergeRoutes);

app.use((req, res, next) => {
    res.status(404).send('');
});






