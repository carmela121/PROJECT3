var express       = require('express');
var app           = express();
var morgan        = require('morgan');
var cors          = require('cors');
var port          = process.env.PORT || 3000;
var mongoose      = require('mongoose');
var bodyParser    = require('body-parser');
var router        = require('./config/routes');
var database      = require('./config/database');

// var jwt           = require('jsonwebtoken');
// var secret        = require('./config/tokens').secret;

mongoose.connect(database.uri);

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

app.listen(port, function() {
  console.log("Express is listening on port " + port);
});
