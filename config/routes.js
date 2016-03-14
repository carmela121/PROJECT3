var router = require('express').Router();
// var jwt = require('jsonwebtoken');
var usersController = require('../controllers/users');
// var authenticationController = require('../controllers/authentication');
// var secret = require('../config/tokens').secret;

router.route('/users')
  .get(usersController.index)

router.route('/users/:id')
  .get(usersController.show)



 module.exports = router;
