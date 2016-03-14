var router = require('express').Router();
var jwt = require('jsonwebtoken');
var usersController = require('../controllers/users');
<<<<<<< HEAD
var authenticationController = require('../controllers/authentication');
=======
var authenticationController = require('../controllers/authentications');
>>>>>>> dev
var secret = require('../config/tokens').secret;

router.route('/users')
  .get(usersController.index);

router.route('/users/:id')
  .get(usersController.show);

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

router.post('login', authenticationController.login)


 module.exports = router;
