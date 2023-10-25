const express = require('express');
const empCtr = require('../Controllers/homepageCtr');
const empRoute = express.Router();

empRoute.get('/', empCtr.homepage);


module.exports = empRoute;