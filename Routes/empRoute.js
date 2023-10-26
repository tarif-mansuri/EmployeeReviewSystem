const express = require('express');
const empRoute = express.Router();
const empCtr = require('../Controllers/empCtr');

empRoute.post('/', empCtr.createEmployee);
empRoute.get('/', empCtr.getEmployees);
empRoute.get('/:id', empCtr.getEmployee);
empRoute.delete('/:id', empCtr.deleteEmployee);
empRoute.put('/:id', empCtr.updateEmployee);
empRoute.post('/login', empCtr.login);
empRoute.post('/logout', empCtr.logOut);

//Get All Reviews of a particular Employee
empRoute.get('/:id/reviews', empCtr.getAllReviews);
empRoute.post('/feedback', empCtr.createFeedback);

module.exports = empRoute;