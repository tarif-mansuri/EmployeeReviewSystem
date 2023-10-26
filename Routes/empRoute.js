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



module.exports = empRoute;