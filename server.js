const express = require('express');
const homepageRoute = require('./Routes/homepageRoute');
const empRoute = require('./Routes/empRoute');
const reviewRoute = require('./Routes/reviewRoute');
const db = require('./DB/dbConnection');
const app = express();

app.set('view-engine', 'ejs');
app.set('views', './views');
app.use(express.static('./static/'));
app.use(express.urlencoded());
app.use(express.json());
app.use('/homepage', homepageRoute);
app.use('/employees', empRoute);
app.use('/reviews', reviewRoute);
app.listen('8000');