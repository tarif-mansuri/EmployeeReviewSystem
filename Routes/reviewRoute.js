const express = require('express');
const reviewRoute = express.Router();
const reviewCtr = require('../Controllers/reviewCtr');


reviewRoute.post('/employees/:id', reviewCtr.createReview);
reviewRoute.delete('/employees/:id', reviewCtr.deleteReview);
reviewRoute.put('/employees/:id', reviewCtr.updateReview);


module.exports = reviewRoute;