var router = require('express').Router();
var jwt = require('jsonwebtoken');
var usersController = require('../controllers/users');


var authenticationController = require('../controllers/authentications');

var secret = require('../config/tokens').secret;

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });

  var token = req.headers.authorization.replace('Bearer ', '');

  jwt.verify(token, secret, function(err, user) {
    if(!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

router.route('/users')
  .get(usersController.index);

router.route('/users/:id')
  .get(usersController.show);

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);



 module.exports = router;
