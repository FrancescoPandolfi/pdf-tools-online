const express = require('express');

const mergeRoutes = require('./routes/merge')
const cors = require("cors");

const app = express();
app.listen(process.env.PORT || 8888);

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/api', mergeRoutes);






